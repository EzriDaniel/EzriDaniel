# Portfolio Website

A modern, interactive portfolio website with a hacker/matrix theme, built with React 19, Vite, Tailwind CSS, and Framer Motion.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer)

## Features

- **Matrix Rain Animation** - Canvas-based animated background with mouse interaction
- **Profile Visualization** - Dynamic particle system with orbital motion and glitch effects
- **Interactive Skills** - Toggle between linear and radial views with hover animations
- **Terminal Aesthetic** - Typing animations and command-line styled elements
- **Page Transitions** - Smooth route changes with Framer Motion
- **Responsive Design** - Mobile-first layout adapting to all screen sizes
- **Accessibility** - ARIA labels, keyboard navigation, and reduced motion support

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite | Build Tool & Dev Server |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| React Router DOM | Client-side Routing |

## Live
View portfolio here [https://ezridanielgweth.vercel.app/](https://ezridanielgweth.vercel.app/)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

### Build Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run run lint
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, About, Skills, Projects, Contact
│   └── ui/              # MatrixRain, ProfileVisualization, SkillCard
├── data/                # personalInfo.js, skills.js, projects.js
├── assets/              # Images and media files
├── App.jsx              # Main app with routing
├── main.jsx             # React entry point
└── index.css            # Global styles and animations
```

## Configuration

### Personal Information

Update `src/data/personalInfo.js` with your details:

```javascript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... other fields
};
```

### Skills

Edit `src/data/skills.js` to add or modify skills:

```javascript
export const technicalSkills = [
  { name: "Skill Name", proficiency: 90, category: "Core", icon: "..." },
  // ... more skills
];
```

### Projects

Update `src/data/projects.js` with your projects:

```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description",
    technologies: ["React", "Node.js"],
    links: [{ label: "GitHub", url: "..." }],
    // ... other fields
  },
];
```

## Theme Customization

### Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'matrix-green': '#00ff41',
      'cyber-black': '#0a0a0a',
      'neon-pink': '#ff00ff',
      'neon-blue': '#00ffff',
    }
  }
}
```

### Animations

Custom animations in `src/index.css`:

```css
@keyframes matrixRain { /* ... */ }
@keyframes typing { /* ... */ }
@keyframes glitch { /* ... */ }
```

## Deployment

See [docs/deployment-guide.md](docs/deployment-guide.md) for detailed deployment instructions for:
- Vercel (Recommended)
- Netlify
- GitHub Pages
- Firebase Hosting

## Documentation

- [Configuration Guide](docs/portfolio-config-guide.md) - How to customize your portfolio
- [Social Media Guide](docs/social-media-guide.md) - Professional profile setup
- [Deployment Guide](docs/deployment-guide.md) - Hosting platform instructions

## License

This project is for personal portfolio use. Customize it for your own portfolio while maintaining the aesthetic theme.

## Contact

**Ezri Daniel Gweth**
- Email: ezridgweth@gweenscraft.co.ke
- LinkedIn: [linkedin.com/in/ezri-gweth-770974207](https://www.linkedin.com/in/ezri-gweth-770974207)
- GitHub: [github.com/EzriDaniel](https://github.com/EzriDaniel)
