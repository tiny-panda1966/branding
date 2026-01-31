/* ========================================
   BRAND GUIDE - Color Palette Features
   Drag & Drop, Color Picker, Color Names
   ======================================== */

// ============================================
// COLOR NAME DATABASE
// ============================================
const colorNames = {
    red: ['Red', 'Crimson', 'Scarlet', 'Ruby', 'Cherry', 'Coral', 'Vermillion'],
    orange: ['Orange', 'Tangerine', 'Amber', 'Apricot', 'Peach', 'Rust', 'Copper'],
    yellow: ['Yellow', 'Gold', 'Lemon', 'Mustard', 'Honey', 'Canary', 'Saffron'],
    lime: ['Lime', 'Chartreuse', 'Apple', 'Pear', 'Spring', 'Citrus'],
    green: ['Green', 'Emerald', 'Forest', 'Mint', 'Sage', 'Olive', 'Jade', 'Teal'],
    cyan: ['Cyan', 'Aqua', 'Turquoise', 'Teal', 'Ocean', 'Marine', 'Seafoam'],
    blue: ['Blue', 'Navy', 'Sky', 'Azure', 'Cobalt', 'Sapphire', 'Indigo', 'Royal'],
    purple: ['Purple', 'Violet', 'Lavender', 'Plum', 'Grape', 'Amethyst', 'Orchid'],
    magenta: ['Magenta', 'Fuchsia', 'Pink', 'Rose', 'Cerise', 'Hot Pink', 'Raspberry'],
    pink: ['Pink', 'Rose', 'Blush', 'Salmon', 'Coral', 'Flamingo', 'Bubblegum'],
    neutral: ['Grey', 'Charcoal', 'Slate', 'Silver', 'Ash', 'Stone', 'Graphite']
};

function getColorBaseName(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hue = hsl.h;
    const sat = hsl.s;
    const light = hsl.l;
    
    let colorFamily;
    
    if (sat < 15) {
        if (light > 90) return 'White';
        if (light < 15) return 'Black';
        return light > 50 ? 'Light Grey' : 'Dark Grey';
    }
    
    if (hue < 15 || hue >= 345) colorFamily = 'red';
    else if (hue < 45) colorFamily = 'orange';
    else if (hue < 70) colorFamily = 'yellow';
    else if (hue < 100) colorFamily = 'lime';
    else if (hue < 170) colorFamily = 'green';
    else if (hue < 200) colorFamily = 'cyan';
    else if (hue < 260) colorFamily = 'blue';
    else if (hue < 290) colorFamily = 'purple';
    else if (hue < 330) colorFamily = 'magenta';
    else colorFamily = 'pink';
    
    return colorNames[colorFamily][0];
}

function getColorNameSuggestion(hex, prefix = '') {
    const baseName = getColorBaseName(hex);
    return prefix ? `${prefix} ${baseName}` : baseName;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

// ============================================
// DRAG AND DROP STATE
// ============================================
let draggedBlob = null;
let dragStartX = 0;
let dragStartY = 0;
let blobStartX = 0;
let blobStartY = 0;
let isDraggingBlob = false;
let hasMoved = false;

// ============================================
// COLOR PICKER STATE
// ============================================
let activeBlob = null;
let currentColor = '';
let currentName = '';
let suggestedColorName = '';

// ============================================
// INITIALIZE COLORS SECTION
// ============================================
function initColorsSection() {
    const blobs = document.querySelectorAll('#colors .color-blob');
    if (blobs.length === 0) return; // Not on colors section
    
    // Setup drag and drop for each blob
    blobs.forEach(blob => {
        blob.addEventListener('mousedown', startDrag);
    });
    
    // Setup color picker event listeners
    const nativePicker = document.getElementById('nativePicker');
    const hexInput = document.getElementById('hexInput');
    const nameInput = document.getElementById('nameInput');
    const overlay = document.getElementById('colorPickerOverlay');
    const modal = document.getElementById('colorPickerModal');
    
    if (nativePicker) {
        nativePicker.addEventListener('input', function(e) {
            currentColor = e.target.value.toUpperCase();
            hexInput.value = currentColor;
            document.getElementById('newColorPreview').style.background = currentColor;
            updateSuggestedName(currentColor);
        });
    }
    
    if (hexInput) {
        hexInput.addEventListener('input', function(e) {
            let val = e.target.value;
            if (!val.startsWith('#')) val = '#' + val;
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                currentColor = val.toUpperCase();
                nativePicker.value = currentColor;
                document.getElementById('newColorPreview').style.background = currentColor;
                updateSuggestedName(currentColor);
            }
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            currentName = e.target.value;
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeColorPicker();
            }
        });
    }
    
    // Draggable modal
    if (modal) {
        let isModalDragging = false;
        let modalDragOffsetX = 0;
        let modalDragOffsetY = 0;
        
        modal.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
            isModalDragging = true;
            const rect = modal.getBoundingClientRect();
            modalDragOffsetX = e.clientX - rect.left;
            modalDragOffsetY = e.clientY - rect.top;
            modal.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isModalDragging) return;
            modal.style.left = (e.clientX - modalDragOffsetX) + 'px';
            modal.style.top = (e.clientY - modalDragOffsetY) + 'px';
            modal.style.transform = 'none';
        });
        
        document.addEventListener('mouseup', function() {
            if (isModalDragging) {
                isModalDragging = false;
                modal.style.cursor = 'move';
            }
        });
    }
}

// ============================================
// DRAG AND DROP FUNCTIONS
// ============================================
function startDrag(e) {
    draggedBlob = e.currentTarget;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    const rect = draggedBlob.getBoundingClientRect();
    blobStartX = rect.left;
    blobStartY = rect.top;
    
    isDraggingBlob = true;
    hasMoved = false;
}

// Global mouse move handler for blob dragging
document.addEventListener('mousemove', function(e) {
    if (!isDraggingBlob || !draggedBlob) return;
    
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        hasMoved = true;
        draggedBlob.classList.add('dragging');
        
        draggedBlob.style.position = 'fixed';
        draggedBlob.style.left = (blobStartX + dx) + 'px';
        draggedBlob.style.top = (blobStartY + dy) + 'px';
        draggedBlob.style.margin = '0';
        
        const blobs = document.querySelectorAll('#colors .color-blob');
        blobs.forEach(blob => {
            if (blob !== draggedBlob) {
                blob.classList.remove('drop-target');
                
                const rect = blob.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + 
                    Math.pow(e.clientY - centerY, 2)
                );
                
                if (distance < rect.width / 2 + 30) {
                    blob.classList.add('drop-target');
                }
            }
        });
    }
});

// Global mouse up handler for blob dragging
document.addEventListener('mouseup', function(e) {
    if (!isDraggingBlob || !draggedBlob) return;
    
    const dropTarget = document.querySelector('#colors .color-blob.drop-target');
    
    if (dropTarget && hasMoved) {
        swapColors(draggedBlob, dropTarget);
    }
    
    draggedBlob.classList.remove('dragging');
    draggedBlob.style.position = '';
    draggedBlob.style.left = '';
    draggedBlob.style.top = '';
    draggedBlob.style.margin = '';
    
    const blobs = document.querySelectorAll('#colors .color-blob');
    blobs.forEach(blob => blob.classList.remove('drop-target'));
    
    if (!hasMoved) {
        openColorPicker(draggedBlob);
    }
    
    draggedBlob = null;
    isDraggingBlob = false;
    hasMoved = false;
});

function swapColors(blob1, blob2) {
    const color1 = blob1.dataset.color;
    const color2 = blob2.dataset.color;
    const role1 = blob1.dataset.role;
    const role2 = blob2.dataset.role;
    const id1 = blob1.dataset.colorId;
    const id2 = blob2.dataset.colorId;
    
    const newName1 = getColorNameSuggestion(color2, role1);
    const newName2 = getColorNameSuggestion(color1, role2);
    
    blob1.style.background = color2;
    blob1.dataset.color = color2;
    blob1.dataset.colorName = newName1;
    
    blob2.style.background = color1;
    blob2.dataset.color = color1;
    blob2.dataset.colorName = newName2;
    
    updateBlobTooltip(blob1, newName1, color2);
    updateBlobTooltip(blob2, newName2, color1);
    
    updateLabel(id1, newName1);
    updateLabel(id2, newName2);
    
    updateSwatch(id1, color2, newName1);
    updateSwatch(id2, color1, newName2);
    
    showSwapNotification();
    
    const label1 = document.querySelector(`.palette-label[data-label-for="${id1}"]`);
    const label2 = document.querySelector(`.palette-label[data-label-for="${id2}"]`);
    if (label1) label1.classList.add('swapped');
    if (label2) label2.classList.add('swapped');
    setTimeout(() => {
        if (label1) label1.classList.remove('swapped');
        if (label2) label2.classList.remove('swapped');
    }, 1500);
}

function updateBlobTooltip(blob, name, color) {
    const rgb = hexToRgb(color);
    const tooltip = blob.querySelector('.blob-tooltip');
    tooltip.innerHTML = `
        <div class="tooltip-name">${name}</div>
        <div class="tooltip-codes">${color.toUpperCase()} · RGB ${rgb.r}, ${rgb.g}, ${rgb.b}</div>
    `;
}

function updateLabel(colorId, name) {
    const label = document.querySelector(`.palette-label[data-label-for="${colorId}"]`);
    if (label) {
        label.textContent = name;
    }
}

function updateSwatch(colorId, color, name) {
    const swatchCard = document.querySelector(`.color-card[data-color-id="${colorId}"]`);
    if (swatchCard) {
        const rgb = hexToRgb(color);
        swatchCard.querySelector('.color-swatch').style.background = color;
        swatchCard.querySelector('.color-name').textContent = name;
        swatchCard.querySelector('.color-hex').textContent = color.toUpperCase();
        swatchCard.querySelector('.color-rgb').textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }
}

function showSwapNotification() {
    const notification = document.getElementById('swapNotification');
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

// ============================================
// COLOR PICKER FUNCTIONS
// ============================================
function openColorPicker(blob) {
    activeBlob = blob;
    const originalColor = blob.dataset.originalColor;
    currentColor = blob.dataset.color;
    currentName = blob.dataset.colorName;
    
    const nativePicker = document.getElementById('nativePicker');
    const hexInput = document.getElementById('hexInput');
    const nameInput = document.getElementById('nameInput');
    const originalPreview = document.getElementById('originalColorPreview');
    const newPreview = document.getElementById('newColorPreview');
    const overlay = document.getElementById('colorPickerOverlay');
    
    if (nativePicker) nativePicker.value = currentColor;
    if (hexInput) hexInput.value = currentColor;
    if (nameInput) nameInput.value = currentName;
    if (originalPreview) originalPreview.style.background = originalColor;
    if (newPreview) newPreview.style.background = currentColor;
    
    updateSuggestedName(currentColor);
    if (overlay) overlay.classList.add('active');
}

function updateSuggestedName(hex) {
    if (!activeBlob) return;
    const role = activeBlob.dataset.role || '';
    suggestedColorName = getColorNameSuggestion(hex, role);
    const suggestedNameEl = document.getElementById('suggestedName');
    if (suggestedNameEl) {
        suggestedNameEl.textContent = `Suggestion: ${suggestedColorName} (click to use)`;
    }
}

function useSuggestedName() {
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.value = suggestedColorName;
        currentName = suggestedColorName;
    }
}

function closeColorPicker() {
    const overlay = document.getElementById('colorPickerOverlay');
    if (overlay) overlay.classList.remove('active');
    activeBlob = null;
}

function undoColor() {
    if (!activeBlob) return;
    
    const originalColor = activeBlob.dataset.originalColor;
    const originalName = activeBlob.dataset.originalName;
    currentColor = originalColor;
    currentName = originalName;
    
    const nativePicker = document.getElementById('nativePicker');
    const hexInput = document.getElementById('hexInput');
    const nameInput = document.getElementById('nameInput');
    const newPreview = document.getElementById('newColorPreview');
    
    if (nativePicker) nativePicker.value = originalColor;
    if (hexInput) hexInput.value = originalColor;
    if (nameInput) nameInput.value = originalName;
    if (newPreview) newPreview.style.background = originalColor;
    
    updateSuggestedName(originalColor);
}

function applyColor() {
    if (!activeBlob) return;
    
    const colorId = activeBlob.dataset.colorId;
    const nameInput = document.getElementById('nameInput');
    const newName = (nameInput && nameInput.value) || currentName;
    
    activeBlob.style.background = currentColor;
    activeBlob.dataset.color = currentColor;
    activeBlob.dataset.colorName = newName;
    
    updateBlobTooltip(activeBlob, newName, currentColor);
    updateLabel(colorId, newName);
    updateSwatch(colorId, currentColor, newName);
    
    closeColorPicker();
}
