/**
 * Brand Guide Build Script
 * Combines modular CSS, HTML sections, and JS into a single brand-guide.html file
 * 
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'brand-guide.html');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Read CSS
const css = fs.readFileSync(path.join(ROOT_DIR, 'css', 'styles.css'), 'utf8');

// Read JS files in order
const configJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'config.js'), 'utf8');
const utilsJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'utils.js'), 'utf8');
const modalJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'modal.js'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'app.js'), 'utf8');

// Read all section HTML files
const builderSections = {};
const identitySections = {};

const builderDir = path.join(ROOT_DIR, 'sections', 'builder');
const identityDir = path.join(ROOT_DIR, 'sections', 'identity');

// Read builder sections
fs.readdirSync(builderDir).forEach(file => {
    if (file.endsWith('.html')) {
        const sectionId = file.replace('.html', '');
        builderSections[sectionId] = fs.readFileSync(path.join(builderDir, file), 'utf8');
    }
});

// Read identity sections
fs.readdirSync(identityDir).forEach(file => {
    if (file.endsWith('.html')) {
        const sectionId = file.replace('.html', '');
        identitySections[sectionId] = fs.readFileSync(path.join(identityDir, file), 'utf8');
    }
});

// Create embedded sections object
const sectionsData = JSON.stringify({
    builder: builderSections,
    identity: identitySections
});

// Modified app.js that uses embedded sections instead of fetch
const modifiedAppJs = appJs.replace(
    /\/\/ Load section content[\s\S]*?function loadSection\(sectionId\) \{[\s\S]*?\.catch\(error => \{[\s\S]*?\}\);[\s\S]*?\}/,
    `// Load section content (bundled version - no fetch needed)
function loadSection(sectionId) {
    const contentBody = document.getElementById('contentBody');
    
    // Determine section type
    const isBuilder = CONFIG.navigation.builder.sections.some(s => s.id === sectionId);
    const folder = isBuilder ? 'builder' : 'identity';
    
    // Get section from embedded data
    const html = SECTIONS_DATA[folder][sectionId];
    
    if (html) {
        contentBody.innerHTML = html;
        animateCards(sectionId);
        initSectionFeatures(sectionId);
    } else {
        contentBody.innerHTML = \`
            <div class="concept-card card">
                <h3>\${getIcon('alert-circle')} Section Coming Soon</h3>
                <p>This section is currently being built. Check back soon!</p>
            </div>
        \`;
    }
}`
);

// Build the complete HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brand Guide</title>
    <link href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
${css}
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
            </div>
            <div class="sidebar-title">Brand Guide</div>
        </div>
        
        <div class="progress-section">
            <div class="progress-label">
                <span>Progress</span>
                <span class="progress-percent" id="progressPercent">0%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill" style="width: 0%"></div>
            </div>
        </div>
        
        <nav class="sidebar-nav" id="sidebarNav">
            <!-- Navigation built by JS -->
        </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <header class="content-header">
            <div>
                <h1 class="section-title" id="sectionTitle">Introduction</h1>
                <p class="section-subtitle" id="sectionSubtitle">Welcome to your brand guide builder</p>
            </div>
        </header>
        
        <div class="content-body" id="contentBody">
            <!-- Section content loaded here -->
        </div>
    </main>
    
    <!-- Modal -->
    <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title" id="modalTitle">Edit Field</h3>
                <button class="modal-close" onclick="closeModal()">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-suggestion" id="modalSuggestion"></div>
                <textarea class="modal-textarea" id="modalTextarea" placeholder="Enter your content..."></textarea>
                <div class="char-count"><span id="charCount">0</span> characters</div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveModal()">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    Save
                </button>
            </div>
        </div>
    </div>
    
    <!-- Toast -->
    <div class="toast" id="toast"></div>

    <!-- Embedded Sections Data -->
    <script>
const SECTIONS_DATA = ${sectionsData};
    </script>
    
    <!-- JavaScript -->
    <script>
${configJs}

${utilsJs}

${modalJs}

${modifiedAppJs}
    </script>
</body>
</html>`;

// Write output file
fs.writeFileSync(OUTPUT_FILE, html, 'utf8');

console.log('✅ Build complete: ' + OUTPUT_FILE);
console.log('   CSS:      ' + css.length.toLocaleString() + ' chars');
console.log('   Config:   ' + configJs.length.toLocaleString() + ' chars');
console.log('   Utils:    ' + utilsJs.length.toLocaleString() + ' chars');
console.log('   Modal:    ' + modalJs.length.toLocaleString() + ' chars');
console.log('   App:      ' + appJs.length.toLocaleString() + ' chars');
console.log('   Sections: ' + Object.keys(builderSections).length + ' builder, ' + Object.keys(identitySections).length + ' identity');
console.log('   Total:    ' + html.length.toLocaleString() + ' chars');
