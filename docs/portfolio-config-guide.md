# Portfolio Configuration Guide

This guide explains how to configure and customize your portfolio website with your personal information, projects, and preferences.

## Table of Contents
1. [Personal Information Configuration](#personal-information-configuration)
2. [Projects Configuration](#projects-configuration)
3. [Skills Configuration](#skills-configuration)
4. [Styling & Theme Customization](#styling--theme-customization)
5. [Adding New Sections](#adding-new-sections)
6. [Deployment Instructions](#deployment-instructions)

## Personal Information Configuration

All personal information is located in the `src/data/personalInfo.js` file (create this file if it doesn't exist).

### Step 1: Create the data file
Create `src/data/personalInfo.js` with the following structure:

```javascript
export const personalInfo = {
  name: "Ezri Daniel Gweth",
  title: "Software Engineer | Full Stack Developer | Tech Innovator",
  nationality: "Kenyan",
  location: "Nairobi, Kenya",
  phone: "+254788666778",
  email: "ezridgweth@gweenscraft.co.ke",
  linkedin: "https://www.linkedin.com/in/ezri-gweth-770974207",
  github: "https://github.com/EzriDaniel",

  // Professional summary
  summary: "Passionate Software Engineer and Full Stack Developer based in Nairobi, Kenya with expertise in creating innovative technology solutions that solve real-world problems.",

  // Education
  education: [
    {
      institution: "Jomo Kenyatta University of Agriculture and Technology",
      degree: "BSc Geomatic Engineering and Geospatial Information Systems",
      period: "Sep 2020 - Dec 2025",
      description: "Focused on geospatial technologies, GIS, and agricultural applications."
    }
  ],

  // Languages
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Swahili", proficiency: "Fluent" },
    { name: "Luo", proficiency: "Conversational" }
  ],

  // Qualities
  qualities: [
    "Self-driven",
    "Ambitious",
    "Problem solver"
  ],

  // Interests
  interests: [
    "PenTesting and Security Analysis (Kali Linux)",
    "Environmental Conservation",
    "Wildlife Conservation",
    "Climate change resilience measures",
    "Real-world problem solving using Tech",
    "Reading informative books & doing tech discoveries - Everyday",
    "Musician (Piano pro level player)"
  ]
};
```

### Step 2: Update components to use the data
Modify the About.jsx component to import and use this data:

```javascript
// At the top of About.jsx
import { personalInfo } from '../data/personalInfo';

// Then use the data throughout the component instead of hardcoded values
```

## Projects Configuration

Project data is managed in `src/data/projects.js`. Update this file to add, remove, or modify projects.

### Step 1: Create the projects data file
Create `src/data/projects.js`:

```javascript
export const projects = [
  {
    id: 1,
    title: "Gweens AgriTech",
    description: "Precision agriculture system for Kenyan farmers with IoT sensors, mobile app, and web dashboard",
    category: "Tech",
    image: "/placeholder.svg",
    links: [
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.gweth.gweensagritech" },
      { label: "Website", url: "https://agritech.gweenscraft.co.ke" },
      { label: "GitHub", url: "https://github.com/GweensAgriTech/gweens-agritech.git" }
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Arduino", "IoT Sensors"]
  },
  // ... other projects
];
```

### Step 2: Update Projects.jsx to use the data
Modify Projects.jsx to import and map over the projects data:

```javascript
// At the top of Projects.jsx
import { projects } from '../data/projects';

// Then use projects.map() instead of hardcoded array
```

## Skills Configuration

Skills data is managed in `src/data/skills.js`.

### Step 1: Create the skills data file
Create `src/data/skills.js`:

```javascript
export const technicalSkills = [
  { name: "Software Engineering", proficiency: 95 },
  { name: "Mobile Software Development (Android/iOS)", proficiency: 90 },
  // ... other skills
];

export const softSkills = [
  { name: "Leadership", proficiency: 90 },
  { name: "Communication", proficiency: 85 },
  // ... other skills
];
```

### Step 2: Update Skills.jsx to use the data
Modify Skills.jsx to import and use the skills data.

## Styling & Theme Customization

### Color Theme
The portfolio uses a hacker/green matrix theme. To customize colors:

1. Edit `tailwind.config.js` to modify the color palette
2. Adjust the `--matrix-green` and related colors in `src/index.css`

### Matrix Rain Effect
To customize the matrix rain effect in `src/components/ui/MatrixRain.jsx`:

- Change the `characters` string to use different symbols
- Modify `fontSize` for larger/smaller text
- Adjust the `interval` timing (currently 50ms) for faster/slower rain
- Change the `context.fillStyle` color (currently '#0f0' for green)

### Animations
Animation configurations are in `src/index.css`:
- Adjust timing, delays, and effects in the `@keyframes` sections
- Modify transition durations in components for faster/slower animations

## Adding New Sections

To add a new section to your portfolio:

1. Create a new component in `src/components/sections/` (e.g., `Blog.jsx`)
2. Add the route in `src/App.jsx`:
   ```javascript
   <Route path="/blog" element={<Blog />} />
   ```
3. Add navigation link in `src/components/layout/Navbar.jsx`
4. Add any necessary data files in `src/data/`
5. Export and import the component as needed

## Deployment Instructions

### Local Development
```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Building for Production
```bash
# Create optimized production build
npm run build

# Preview the build locally
npm run preview
```

### Deployment Platforms
The portfolio can be deployed to various platforms:

#### Vercel (Recommended)
1. Push code to GitHub repository
2. Import project in Vercel
3. Vercel will automatically detect Vite/Roc configuration and deploy

#### Netlify
1. Push code to GitHub repository
2. Connect repository in Netlify
3. Set build command to `npm run build` and publish directory to `dist`

#### GitHub Pages
1. Add `homepage` field to package.json: `"homepage": "https://username.github.io/repository"`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy scripts to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run deploy`

#### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize: `firebase init` (choose Hosting)
3. Set public directory to `dist`
4. Deploy: `firebase deploy`

## Maintenance Tips

### Regular Updates
- Update project information when you complete new projects
- Add new skills as you learn them
- Refresh content quarterly to keep it current
- Check all links periodically to ensure they work

### Performance Optimization
- Compress images before adding them to the public directory
- Use lazy loading for images when adding new ones
- Monitor bundle size if adding large dependencies
- Consider using image optimization tools

### Security
- Keep dependencies updated: `npm update` periodically
- Check for vulnerabilities: `npm audit`
- Never expose API keys or sensitive information in client-side code
- Use environment variables for any necessary secrets (though this portfolio doesn't require backend APIs)

## Troubleshooting

### Common Issues
1. **Matrix rain not showing**: Check if the canvas element is being rendered and if there are any JavaScript errors in the console
2. **Styles not applying**: Ensure Tailwind CSS is properly configured and the CSS file is imported
3. **Routing issues**: Verify that all routes are correctly defined in App.jsx and component names match
4. **Build errors**: Check that all imported files exist and have correct file extensions

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify file paths and names are correct
3. Ensure all necessary dependencies are installed
4. Consult the documentation for specific libraries (React, Tailwind CSS, Framer Motion)