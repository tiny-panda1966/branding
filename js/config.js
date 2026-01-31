/* ========================================
   BRAND GUIDE - Configuration
   ======================================== */

const CONFIG = {
    // Navigation structure
    navigation: {
        builder: {
            title: 'Brand Builder',
            titleClass: '',
            sections: [
                { id: 'introduction', label: 'Introduction', icon: 'info', hasProgress: true },
                { id: 'story', label: 'Brand Story', icon: 'target', hasProgress: true },
                { id: 'vision', label: 'Vision & Promise', icon: 'eye', hasProgress: true },
                { id: 'values', label: 'Values & Beliefs', icon: 'heart', hasProgress: true },
                { id: 'personality', label: 'Personality', icon: 'smile', hasProgress: true },
                { id: 'tone', label: 'Tone & Voice', icon: 'message', hasProgress: true },
                { id: 'messaging', label: 'Messaging Structure', icon: 'list', hasProgress: true },
                { id: 'audience', label: 'Target Audience', icon: 'users', hasProgress: true },
                { id: 'personas', label: 'Secondary Personas', icon: 'user-plus', hasProgress: true },
                { id: 'journey', label: 'Customer Journey', icon: 'map', hasProgress: true },
                { id: 'archetype', label: 'Brand Archetype', icon: 'shapes', hasProgress: true },
                { id: 'positioning', label: 'Positioning', icon: 'crosshair', hasProgress: true },
                { id: 'competitors', label: 'Competitor Analysis', icon: 'bar-chart', hasProgress: true },
                { id: 'industry', label: 'Industry Analysis', icon: 'trending-up', hasProgress: true },
                { id: 'creative', label: 'Creative Direction', icon: 'palette', hasProgress: true },
                { id: 'team', label: 'Founder & Team', icon: 'users-cog', hasProgress: true }
            ]
        },
        identity: {
            title: 'Brand Identity',
            titleClass: 'secondary',
            sections: [
                { id: 'logo', label: 'Logo', icon: 'logo' },
                { id: 'logo-misuse', label: 'Logo Misuse', icon: 'alert-circle' },
                { id: 'colors', label: 'Colours', icon: 'droplet' },
                { id: 'typography', label: 'Typography', icon: 'type' },
                { id: 'photography', label: 'Photography', icon: 'image' },
                { id: 'illustration', label: 'Illustration', icon: 'pen-tool' },
                { id: 'icons', label: 'Icon Library', icon: 'grid' },
                { id: 'video', label: 'Video Guidelines', icon: 'video' },
                { id: 'tone-examples', label: 'Tone Examples', icon: 'message-square' },
                { id: 'boilerplate', label: 'Boilerplate Text', icon: 'file-text' },
                { id: 'social', label: 'Social Templates', icon: 'share-2' },
                { id: 'email', label: 'Email Signatures', icon: 'mail' },
                { id: 'stationery', label: 'Stationery', icon: 'briefcase' },
                { id: 'components', label: 'UI Components', icon: 'layers' },
                { id: 'tokens', label: 'Design Tokens', icon: 'code' },
                { id: 'data-viz', label: 'Data Visualisation', icon: 'pie-chart' },
                { id: 'favicons', label: 'Favicons & App Icons', icon: 'smartphone' },
                { id: 'print', label: 'Print Specs', icon: 'printer' },
                { id: 'cobranding', label: 'Co-branding', icon: 'link' },
                { id: 'accessibility', label: 'Accessibility', icon: 'accessibility' },
                { id: 'downloads', label: 'Downloads', icon: 'download' }
            ]
        }
    },
    
    // Section metadata
    sectionInfo: {
        // Brand Builder
        introduction: { title: 'Introduction', subtitle: 'Define your brand\'s foundation' },
        story: { title: 'Brand Story', subtitle: 'Share your origin and mission' },
        vision: { title: 'Vision & Promise', subtitle: 'Define your future and commitment' },
        values: { title: 'Values & Beliefs', subtitle: 'Establish your guiding principles' },
        personality: { title: 'Personality', subtitle: 'Define who you are as a brand' },
        tone: { title: 'Tone & Voice', subtitle: 'How your brand speaks' },
        messaging: { title: 'Messaging Structure', subtitle: 'Framework for communications' },
        audience: { title: 'Target Audience', subtitle: 'Know who you serve' },
        personas: { title: 'Secondary Personas', subtitle: 'Additional audience segments' },
        journey: { title: 'Customer Journey', subtitle: 'Touchpoints and experiences' },
        archetype: { title: 'Brand Archetype', subtitle: 'Your fundamental character' },
        positioning: { title: 'Positioning', subtitle: 'Your place in the market' },
        competitors: { title: 'Competitor Analysis', subtitle: 'Understand your competition' },
        industry: { title: 'Industry Analysis', subtitle: 'Market trends and opportunities' },
        creative: { title: 'Creative Direction', subtitle: 'Visual style and inspiration' },
        team: { title: 'Founder & Team', subtitle: 'The people behind the brand' },
        
        // Brand Identity
        logo: { title: 'Logo', subtitle: 'Logo variants and usage guidelines' },
        'logo-misuse': { title: 'Logo Misuse', subtitle: 'What NOT to do with the logo' },
        colors: { title: 'Colours', subtitle: 'Brand palette with accessibility' },
        typography: { title: 'Typography', subtitle: 'Brand fonts and type hierarchy' },
        photography: { title: 'Photography', subtitle: 'Visual style guidelines' },
        illustration: { title: 'Illustration', subtitle: 'Illustration style and usage' },
        icons: { title: 'Icon Library', subtitle: 'Brand icons with SVG copy' },
        video: { title: 'Video Guidelines', subtitle: 'Motion and video specs' },
        'tone-examples': { title: 'Tone Examples', subtitle: 'Before and after transformations' },
        boilerplate: { title: 'Boilerplate Text', subtitle: 'Standard company descriptions' },
        social: { title: 'Social Templates', subtitle: 'Platform-specific formats' },
        email: { title: 'Email Signatures', subtitle: 'Standard email format' },
        stationery: { title: 'Stationery', subtitle: 'Letterhead, cards, envelopes' },
        components: { title: 'UI Components', subtitle: 'Code snippets and previews' },
        tokens: { title: 'Design Tokens', subtitle: 'Exportable design variables' },
        'data-viz': { title: 'Data Visualisation', subtitle: 'Chart and graph styling' },
        favicons: { title: 'Favicons & App Icons', subtitle: 'Small format specs' },
        print: { title: 'Print Specs', subtitle: 'CMYK, bleed, paper stock' },
        cobranding: { title: 'Co-branding', subtitle: 'Partner logo placement' },
        accessibility: { title: 'Accessibility', subtitle: 'Inclusive design guidelines' },
        downloads: { title: 'Downloads', subtitle: 'Asset packs and version history' }
    },
    
    // Fields for progress tracking (Brand Builder sections only)
    sectionFields: {
        introduction: ['brandName', 'tagline', 'industry', 'founded', 'elevatorPitch'],
        story: ['originStory', 'founderStory', 'mission', 'whyMatters'],
        vision: ['visionStatement', 'brandPromise', 'uniqueValue'],
        values: ['value1', 'value2', 'value3', 'value4', 'beliefs'],
        personality: ['personalityTraits', 'brandPersona', 'culture'],
        tone: ['voiceDescription', 'weAre', 'weAreNot', 'writingDos', 'writingDonts'],
        messaging: ['messagingFramework', 'keyMessages', 'proofPoints'],
        audience: ['personaName', 'personaRole', 'personaCharacteristics', 'painPoints', 'solutions'],
        personas: ['persona2Name', 'persona2Role', 'persona2Pain', 'persona3Name', 'persona3Role', 'persona3Pain'],
        journey: ['awareness', 'consideration', 'decision', 'retention', 'advocacy'],
        archetype: ['archetype', 'archetypeReason'],
        positioning: ['positioningStatement', 'differentiators'],
        competitors: ['competitor1', 'competitor2', 'competitor3', 'competitiveAdvantage'],
        industry: ['industryOverview', 'trends', 'opportunities', 'threats'],
        creative: ['visualStyle', 'moodKeywords', 'inspiration'],
        team: ['founderBio', 'teamCulture', 'teamValues']
    }
};

// Icons SVG paths
const ICONS = {
    'info': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
    'target': '<path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06z"/>',
    'eye': '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>',
    'heart': '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>',
    'smile': '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>',
    'message': '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>',
    'list': '<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>',
    'users': '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
    'user-plus': '<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
    'map': '<path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>',
    'shapes': '<path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="4.5"/><path d="M3 13.5h8v8H3z"/>',
    'crosshair': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><circle cx="12" cy="12" r="3"/>',
    'bar-chart': '<path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>',
    'trending-up': '<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>',
    'palette': '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
    'users-cog': '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
    'logo': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/>',
    'alert-circle': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
    'droplet': '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    'type': '<path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>',
    'image': '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>',
    'pen-tool': '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
    'grid': '<path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>',
    'video': '<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>',
    'message-square': '<path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>',
    'file-text': '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
    'share-2': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>',
    'mail': '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
    'briefcase': '<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>',
    'layers': '<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>',
    'code': '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>',
    'pie-chart': '<path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>',
    'smartphone': '<path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>',
    'printer': '<path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>',
    'link': '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>',
    'accessibility': '<circle cx="12" cy="4" r="2"/><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"/>',
    'download': '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>',
    'check': '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    'edit': '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'
};

// Get SVG icon
function getIcon(name) {
    return `<svg viewBox="0 0 24 24">${ICONS[name] || ICONS['info']}</svg>`;
}
