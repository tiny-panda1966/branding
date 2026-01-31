/* ========================================
   BRAND GUIDE - Modal Functions
   ======================================== */

let currentField = null;

// Open modal for editing
function openModal(field, title, suggestion, placeholder) {
    currentField = field;
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalSuggestion = document.getElementById('modalSuggestion');
    const modalTextarea = document.getElementById('modalTextarea');
    const charCount = document.getElementById('charCount');
    
    modalTitle.textContent = title;
    modalSuggestion.textContent = suggestion;
    modalTextarea.placeholder = placeholder;
    modalTextarea.value = brandData[field] || '';
    charCount.textContent = (brandData[field] || '').length;
    
    modalOverlay.classList.add('active');
    
    setTimeout(() => {
        modalTextarea.focus();
    }, 100);
}

// Close modal
function closeModal(event) {
    if (event && event.target !== document.getElementById('modalOverlay')) {
        return;
    }
    
    document.getElementById('modalOverlay').classList.remove('active');
    currentField = null;
}

// Save field from modal
function saveField() {
    const value = document.getElementById('modalTextarea').value.trim();
    brandData[currentField] = value;
    
    // Update display element
    const display = document.querySelector(`[data-field="${currentField}"]`);
    if (display) {
        if (value) {
            display.textContent = value;
            display.classList.remove('empty');
            display.classList.add('filled');
        } else {
            display.textContent = 'Click to enter...';
            display.classList.add('empty');
            display.classList.remove('filled');
        }
    }
    
    closeModal();
    updateProgress();
    showToast('Saved!');
}

// Modal textarea character count
function setupModalEvents() {
    const modalTextarea = document.getElementById('modalTextarea');
    if (modalTextarea) {
        modalTextarea.addEventListener('input', function() {
            document.getElementById('charCount').textContent = this.value.length;
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'Enter' && e.ctrlKey && currentField) {
            saveField();
        }
    });
}

// Initialize modal events when DOM is ready
document.addEventListener('DOMContentLoaded', setupModalEvents);
