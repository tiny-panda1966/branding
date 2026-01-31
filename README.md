# Brand Guide - Modular UI

A comprehensive, modular brand guide system with interactive Brand Builder and Brand Identity sections.

## 📁 Structure

```
brand-guide-modular/
├── index.html              # Main application shell
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── config.js           # Navigation & section config
│   ├── utils.js            # Utility functions
│   ├── modal.js            # Modal handling
│   └── app.js              # Main application logic
└── sections/
    ├── builder/            # Brand Builder sections (16)
    │   ├── introduction.html
    │   ├── story.html
    │   ├── vision.html
    │   ├── values.html
    │   ├── personality.html
    │   ├── tone.html
    │   ├── messaging.html
    │   ├── audience.html
    │   ├── personas.html
    │   ├── journey.html
    │   ├── archetype.html
    │   ├── positioning.html
    │   ├── competitors.html
    │   ├── industry.html
    │   ├── creative.html
    │   └── team.html
    └── identity/           # Brand Identity sections (21)
        ├── logo.html
        ├── logo-misuse.html
        ├── colors.html
        ├── typography.html
        ├── photography.html
        ├── illustration.html
        ├── icons.html
        ├── video.html
        ├── tone-examples.html
        ├── boilerplate.html
        ├── social.html
        ├── email.html
        ├── stationery.html
        ├── components.html
        ├── tokens.html
        ├── data-viz.html
        ├── favicons.html
        ├── print.html
        ├── cobranding.html
        ├── accessibility.html
        └── downloads.html
```

## 🚀 Features

### Brand Builder (16 sections)
Interactive input forms with:
- Modal-based editing with suggestions
- Progress tracking per section
- Archetype selection grid
- Auto-save to localStorage
- Customer journey timeline

### Brand Identity (21 sections)
Visual guidelines including:
- Logo variants with safety zone toggle
- Colour palette with click-to-copy
- Typography with live font tester
- Icon library with search/filter
- Photography moodboard
- Video specifications
- Tone of voice examples
- Boilerplate text (short/medium/long)
- Social media templates
- Email signatures
- Stationery previews
- UI components with code
- Design tokens (export CSS/JSON)
- Data visualisation guidelines
- Favicons & app icons
- Print specifications (CMYK, Pantone)
- Co-branding rules
- Accessibility checklist
- Asset downloads

## 🎨 Styling

- **Primary:** #E43292 (Brand Pink)
- **Secondary:** #9C27B0 (Purple)
- **Font:** Wix Madefor Text
- **Border Radius:** 6px / 10px / 16px
- **Shadows:** Subtle elevation system

## 💻 Usage

### Local Development
Simply open `index.html` in a browser. No build process required.

### Deployment
Host on any static server (GitHub Pages, Netlify, Vercel) or embed in an iframe.

### Wix Integration
To embed in Wix:
1. Deploy to GitHub Pages or similar
2. Add HTML iframe component in Wix
3. Set iframe source to your deployed URL

## 🔧 Customisation

### Adding New Sections

1. Create HTML file in `sections/builder/` or `sections/identity/`
2. Add section to `CONFIG.navigation` in `js/config.js`
3. Add section info to `CONFIG.sectionInfo`
4. (For builder sections) Add fields to `CONFIG.sectionFields`

### Modifying Styles

All styles are in `css/styles.css` with clear section comments.

### Adding Icons

Add SVG paths to the `ICONS` object in `js/config.js`.

## 📝 Notes

- Sections load dynamically via fetch()
- Progress tracks Brand Builder sections only
- Data stored in `brandData` object
- localStorage save/load ready (see utils.js)

## 📄 License

MIT License - Use freely for your projects.
