# Portfolio Project - Claude Code Instructions

## Project Overview

This is a personal portfolio website for **Ezri Daniel Gweth**, a Software Engineer and Full Stack Developer based in Nairobi, Kenya. The portfolio features a hacker/matrix-themed design with modern animations and interactive elements.

### Tech Stack
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing

## Development Commands

```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Create production build
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Code Conventions

### Component Naming
- Use PascalCase for component files: `ProfileVisualization.jsx`, `SkillCard.jsx`
- One component per file
- Export components as default: `export default ComponentName`

### File Structure
```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Skills, Projects, Contact
│   └── ui/           # Reusable components (MatrixRain, ProfileVisualization, SkillCard)
├── data/             # Static data files (personalInfo.js, skills.js, projects.js)
├── assets/           # Images and media
├── App.jsx           # Main app with routing
├── main.jsx          # React entry point
└── index.css         # Global styles and animations
```

### Import Order
1. React imports (`import { useState } from 'react'`)
2. Third-party libraries (`import { motion } from 'framer-motion'`)
3. Local components (`import MatrixRain from '../ui/MatrixRain'`)
4. Data files (`import { skills } from '../../data/skills'`)
5. Styles (`import './styles.css'`)

### Component Patterns
- Use functional components with hooks
- Destructure props in function parameters
- Use `motion.div` from Framer Motion for animated elements
- Add ARIA labels for accessibility on interactive elements
- Use Tailwind classes, avoid custom CSS when possible

### Data Files
- Keep static data in `src/data/` directory
- Export named constants: `export const technicalSkills = [...]`
- Include metadata: icons, descriptions, categories for enhanced displays

## Theme Customization

### Color System (Single Source of Truth in `index.css`)

**All colors are CSS custom properties** defined in `:root` in `index.css`. Use the utility classes (`.text-h`, `.text-b`, etc.) or CSS vars (`var(--c-heading)`) everywhere. **Do not use Tailwind color classes directly** (e.g. avoid `text-green-300`).

| CSS Var | Utility Class | Color | Contrast on #030303 | Usage |
|---------|--------------|-------|---------------------|-------|
| `--c-primary` | `.text-p` | #00ff41 | 15.3:1 | Neon effects, accents |
| `--c-heading` | `.text-h` | #a7f3d0 | 12.1:1 | Headings, labels |
| `--c-body` | `.text-b` | #d1fae5 | 15.7:1 | Body text |
| `--c-muted` | `.text-m` | #6ee7b7 | 8.7:1 | Secondary text |
| `--c-dim` | `.text-d` | rgba(167,243,208,0.55) | N/A | Placeholders, hints |
| `--c-cyan` | `.text-c` | #67e8f9 | 9.8:1 | Cyan accent |
| `--c-yellow` | `.text-y` | #fde047 | 15.7:1 | Warnings |
| `--c-red` | `.text-r` | #f87171 | 6.3:1 | Errors |

**Background utilities:** `.bg-card` (cards), `.bg-input` (inputs), `.bg-hover` (hover states)
**Border utilities:** `.border-c` (default), `.border-c-h` (hover)
**Hover utilities:** `.hover-h`, `.hover-b`, `.hover-p`, `.hover-c`

**Background:** Page uses `#030303` (not pure black). Matrix rain is a canvas overlay.

### Fonts
- **Headings:** `--font-hack` = `'IBM Plex Mono', 'JetBrains Mono', 'Space Mono', monospace`
- **Body:** `--font-mono` = `'JetBrains Mono', 'IBM Plex Mono', 'Space Mono', monospace`
- Loaded via Google Fonts in `index.html`

### Animation Guidelines
- Use Framer Motion for component entrance/exit animations
- Use CSS keyframes for continuous effects (typing, blinking, floating)
- Stagger animations: `delay: 0.08 + index * 0.07`
- Prefer `transform` and `opacity` for performance

### Glass Effect
```css
.glass-effect {
  background: rgba(5, 5, 5, 0.55);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 255, 65, 0.15);
  border-radius: 0.75rem;
}
```

## Common Patterns

### Creating a New Section
1. Create component in `src/components/sections/NewSection.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Navbar.jsx`

### Creating a Reusable UI Component
1. Create in `src/components/ui/ComponentName.jsx`
2. Use named exports for multiple exports, default for single
3. Include ARIA attributes for accessibility

### Adding Animations
```jsx
// Framer Motion entrance
<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>

// Hover effect
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
```

## Accessibility Checklist
- [ ] All images have alt text or aria-hidden
- [ ] Interactive elements have ARIA labels
- [ ] Color contrast meets WCAG AA (all text colors are 6.3:1+ on background)
- [ ] Focus states are visible (`:focus-visible` in CSS)
- [ ] Reduced motion support (`prefers-reduced-motion` media query)
- [ ] Semantic HTML tags used throughout

## Notes
- The MatrixRain component uses canvas for performance
- ProfileVisualization uses canvas with particle systems
- Page transitions use AnimatePresence from Framer Motion
- All animations respect `prefers-reduced-motion` preference
