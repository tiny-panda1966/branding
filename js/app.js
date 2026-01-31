/* ========================================
   BRAND GUIDE - Main Application
   ======================================== */

let currentSection = 'introduction';

// Initialize application
function init() {
    buildNavigation();
    loadSection('introduction');
    loadDraft();
    updateProgress();
}

// Build sidebar navigation
function buildNavigation() {
    const nav = document.getElementById('sidebarNav');
    let html = '';
    
    // Brand Builder section
    const builder = CONFIG.navigation.builder;
    html += `<div class="nav-section">`;
    html += `<div class="nav-section-title ${builder.titleClass}" onclick="toggleNavSection(this)" data-section-group="builder">
        <span>${builder.title}</span>
        <svg class="nav-chevron" viewBox="0 0 24 24" width="16" height="16"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/></svg>
    </div>`;
    html += `<div class="nav-items-wrapper expanded" data-group="builder">`;
    
    builder.sections.forEach((section, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const progressDot = section.hasProgress ? 
            `<span class="progress-dot" data-section="${section.id}"></span>` : '';
        
        html += `
            <div class="nav-item ${activeClass}" data-section="${section.id}" onclick="navigateTo('${section.id}')">
                ${getIcon(section.icon)}
                ${section.label}
                ${progressDot}
            </div>
        `;
    });
    html += `</div></div>`;
    
    // Brand Identity section
    const identity = CONFIG.navigation.identity;
    html += `<div class="nav-section">`;
    html += `<div class="nav-section-title ${identity.titleClass}" onclick="toggleNavSection(this)" data-section-group="identity">
        <span>${identity.title}</span>
        <svg class="nav-chevron" viewBox="0 0 24 24" width="16" height="16"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/></svg>
    </div>`;
    html += `<div class="nav-items-wrapper expanded" data-group="identity">`;
    
    identity.sections.forEach(section => {
        html += `
            <div class="nav-item" data-section="${section.id}" onclick="navigateTo('${section.id}')">
                ${getIcon(section.icon)}
                ${section.label}
            </div>
        `;
    });
    html += `</div></div>`;
    
    nav.innerHTML = html;
}

// Toggle navigation section collapse/expand
function toggleNavSection(titleElement) {
    const group = titleElement.dataset.sectionGroup;
    const wrapper = document.querySelector(`.nav-items-wrapper[data-group="${group}"]`);
    const isExpanded = wrapper.classList.contains('expanded');
    
    if (isExpanded) {
        wrapper.classList.remove('expanded');
        wrapper.classList.add('collapsed');
        titleElement.classList.add('collapsed');
    } else {
        wrapper.classList.remove('collapsed');
        wrapper.classList.add('expanded');
        titleElement.classList.remove('collapsed');
    }
}

// Navigate to section
function navigateTo(sectionId) {
    currentSection = sectionId;
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
    
    // Update header
    const info = CONFIG.sectionInfo[sectionId];
    if (info) {
        document.getElementById('sectionTitle').textContent = info.title;
        document.getElementById('sectionSubtitle').textContent = info.subtitle;
    }
    
    // Load section content
    loadSection(sectionId);
    
    // Scroll content pane to top
    const contentBody = document.getElementById('contentBody');
    if (contentBody) {
        contentBody.scrollTop = 0;
    }
}

// Load section content
function loadSection(sectionId) {
    const contentBody = document.getElementById('contentBody');
    
    // Determine section type
    const isBuilder = CONFIG.navigation.builder.sections.some(s => s.id === sectionId);
    const folder = isBuilder ? 'builder' : 'identity';
    
    // Fetch section HTML
    fetch(`sections/${folder}/${sectionId}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Section not found');
            }
            return response.text();
        })
        .then(html => {
            contentBody.innerHTML = html;
            
            // Execute any scripts in the loaded content
            const scripts = contentBody.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            
            animateCards(sectionId);
            initSectionFeatures(sectionId);
        })
        .catch(error => {
            console.error('Error loading section:', error);
            contentBody.innerHTML = `
                <div class="concept-card card">
                    <h3>${getIcon('alert-circle')} Section Coming Soon</h3>
                    <p>This section is currently being built. Check back soon!</p>
                </div>
            `;
        });
}

// Initialize section-specific features
function initSectionFeatures(sectionId) {
    // Restore saved data to input fields
    document.querySelectorAll('[data-field]').forEach(el => {
        const field = el.dataset.field;
        if (brandData[field]) {
            el.textContent = brandData[field];
            el.classList.remove('empty');
            el.classList.add('filled');
        }
    });
    
    // Section-specific initializations
    switch (sectionId) {
        case 'typography':
            const fontInput = document.getElementById('fontTesterInput');
            if (fontInput) {
                fontInput.addEventListener('input', function() {
                    updateFontTester(this);
                });
            }
            break;
            
        case 'icons':
            const iconFilter = document.getElementById('iconFilter');
            const iconSearch = document.getElementById('iconSearch');
            
            if (iconFilter) {
                iconFilter.addEventListener('change', function() {
                    filterIcons(this.value);
                });
            }
            
            if (iconSearch) {
                iconSearch.addEventListener('input', function() {
                    searchIcons(this.value);
                });
            }
            break;
            
        case 'archetype':
            // Restore selected archetype
            if (brandData.archetype) {
                document.querySelectorAll('.archetype-card').forEach(card => {
                    const name = card.querySelector('.archetype-name').textContent;
                    if (name === brandData.archetype || 
                        'The ' + name === brandData.archetype) {
                        card.classList.add('selected');
                    }
                });
            }
            break;
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
