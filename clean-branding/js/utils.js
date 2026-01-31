/* ========================================
   BRAND GUIDE - Utility Functions
   ======================================== */

// Brand data storage
const brandData = {};

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        showToast('Failed to copy', 'error');
    });
}

// Copy color
function copyColor(hex) {
    copyToClipboard(hex);
    showToast('Copied ' + hex);
}

// Copy icon SVG
function copyIcon(el) {
    const svg = el.querySelector('svg').outerHTML;
    copyToClipboard(svg);
    showToast('SVG copied!');
}

// Toggle logo safety zone
function toggleSafety() {
    const btn = document.getElementById('safetyToggle');
    if (btn) {
        btn.classList.toggle('active');
        document.querySelectorAll('.logo-variant').forEach(v => v.classList.toggle('show-safety'));
    }
}

// Select archetype
function selectArchetype(card, name) {
    document.querySelectorAll('.archetype-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    brandData.archetype = name;
    updateProgress();
    showToast(name + ' selected!');
}

// Toggle download item
function toggleDownload(item) {
    item.classList.toggle('selected');
    const count = document.querySelectorAll('.download-item.selected').length;
    const countEl = document.getElementById('downloadCount');
    const btnEl = document.getElementById('bulkDownloadBtn');
    
    if (countEl) countEl.textContent = count;
    if (btnEl) btnEl.disabled = count === 0;
}

// Switch boilerplate tab
function switchBoilerplate(tab, length) {
    document.querySelectorAll('.boilerplate-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    document.querySelectorAll('.boilerplate-text').forEach(t => t.classList.remove('active'));
    const target = document.querySelector(`.boilerplate-text[data-length="${length}"]`);
    if (target) target.classList.add('active');
}

// Copy boilerplate
function copyBoilerplate() {
    const active = document.querySelector('.boilerplate-text.active');
    if (active) {
        copyToClipboard(active.textContent);
    }
}

// Font tester update
function updateFontTester(input) {
    const text = input.value || 'Your Brand Name';
    const outputs = document.querySelectorAll('.font-output-text');
    outputs.forEach(output => {
        output.textContent = text;
    });
}

// Icon filter
function filterIcons(filter) {
    document.querySelectorAll('.icon-item').forEach(item => {
        const category = item.dataset.category || '';
        item.style.display = (!filter || category === filter) ? 'flex' : 'none';
    });
}

// Icon search
function searchIcons(query) {
    const search = query.toLowerCase();
    document.querySelectorAll('.icon-item').forEach(item => {
        const name = item.querySelector('.icon-name').textContent.toLowerCase();
        item.style.display = name.includes(search) ? 'flex' : 'none';
    });
}

// Save draft to localStorage
function saveDraft() {
    try {
        localStorage.setItem('brandGuideData', JSON.stringify(brandData));
        showToast('Draft saved!');
    } catch (e) {
        showToast('Failed to save', 'error');
    }
}

// Load draft from localStorage
function loadDraft() {
    try {
        const saved = localStorage.getItem('brandGuideData');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(brandData, data);
            
            // Update UI
            Object.keys(data).forEach(field => {
                const el = document.querySelector(`[data-field="${field}"]`);
                if (el && data[field]) {
                    el.textContent = data[field];
                    el.classList.remove('empty');
                    el.classList.add('filled');
                }
            });
            
            updateProgress();
        }
    } catch (e) {
        console.error('Failed to load draft:', e);
    }
}

// Export PDF (placeholder)
function exportPDF() {
    showToast('PDF export coming soon!', 'warning');
}

// Update progress bar
function updateProgress() {
    let total = 0;
    let filled = 0;
    
    Object.keys(CONFIG.sectionFields).forEach(section => {
        const fields = CONFIG.sectionFields[section];
        const sectionFilled = fields.filter(f => brandData[f] && brandData[f].trim()).length;
        
        total += fields.length;
        filled += sectionFilled;
        
        // Update section progress dot
        const dot = document.querySelector(`.progress-dot[data-section="${section}"]`);
        if (dot) {
            dot.classList.remove('complete', 'partial');
            if (sectionFilled === fields.length) {
                dot.classList.add('complete');
            } else if (sectionFilled > 0) {
                dot.classList.add('partial');
            }
        }
    });
    
    const progress = total > 0 ? Math.round((filled / total) * 100) : 0;
    const progressEl = document.getElementById('overallProgress');
    const progressFill = document.getElementById('progressFill');
    
    if (progressEl) progressEl.textContent = progress + '%';
    if (progressFill) progressFill.style.width = progress + '%';
}

// Animate cards when section loads
function animateCards(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.querySelectorAll('.card').forEach((card, i) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.1}s`;
        });
    }
}
