# Temperate Okhiria — Portfolio Website

## Folder Structure

```
portfolio/
│
├── index.html          ← Main HTML file (all 3 pages inside)
│
├── css/
│   └── style.css       ← All styles, colours, layouts, animations
│
├── js/
│   └── main.js         ← All JavaScript: routing, animations,
│                          mobile nav, form, cursor, counters
│
├── images/             ← Put all your images here
│   ├── HOME.jpeg
│   ├── about-us.jpeg
│   ├── contact-us.jpeg
│   ├── our services.jpeg
│   ├── our-project.jpeg
│   ├── why-us.jpeg
│   └── profile.png     ← Your profile photo
│
└── documents/
    └── EHIS TEMPERATE OKHIRIA CV.pdf   ← Your CV for download
```

## How to Use

1. Open `index.html` in your browser to preview locally
2. Upload ALL files and folders to your hosting (Hostinger etc.)
   — Keep the folder structure exactly as it is
3. The site has 3 pages: Home, Projects, Contact
   — All in one `index.html` file, switched by JavaScript

## Adding a New Project

Open `index.html` and find the Projects section.
Copy this block and fill in your details:

```html
<div class="project-card anim">
  <div class="project-img-wrap">
    <img src="images/YOUR-IMAGE.jpeg" class="project-img" alt="Project Name" loading="lazy">
    <div class="project-overlay">
      <div class="project-overlay-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="project-body">
    <div class="project-tags">
      <span class="project-tag">WordPress</span>
      <span class="project-tag">Elementor</span>
    </div>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-desc">Short description of the project.</p>
    <div class="project-footer">
      <span class="project-year">2026</span>
      <a href="https://yourprojecturl.com" class="project-link" target="_blank">
        View Site
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>
  </div>
</div>
```

## Customising Colours

Open `css/style.css` — all colours are CSS variables at the top:

```css
:root {
  --green:  #00e5a0;   /* Main accent colour */
  --gold:   #f5c842;   /* Future skills colour */
  --bg:     #080b10;   /* Page background */
  --white:  #f0ede6;   /* Main text */
  --muted:  #8892a4;   /* Secondary text */
}
```

---
Built with HTML, CSS & JavaScript  
Designed for Temperate Okhiria — Lagos, Nigeria
