# Deployment Guide

This guide covers deploying your portfolio to various hosting platforms.

## Prerequisites

Before deploying, ensure your portfolio builds successfully:

```bash
# Install dependencies (if not already done)
npm install

# Create production build
npm run build

# Verify build output in dist/ folder
npm run preview
```

## Deployment Options

### Vercel (Recommended)

Vercel offers the best experience for Vite + React projects with automatic deployments.

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-portfolio.git
git push -u origin main
```

**Step 2: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration
5. Click "Deploy"

**Step 3: Configure Custom Domain (Optional)**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Vercel Configuration** (optional `vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### Netlify

Netlify provides easy deployment with drag-and-drop or Git integration.

**Option A: Git Integration**
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Option B: Manual Deploy**
1. Run `npm run build`
2. Go to Netlify dashboard
3. Drag and drop the `dist` folder

**SPA Routing Configuration**

Create `public/_redirects` file:
```
/*    /index.html   200
```

This ensures client-side routing works correctly.

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### GitHub Pages

Free hosting directly from your GitHub repository.

**Step 1: Install gh-pages**
```bash
npm install --save-dev gh-pages
```

**Step 2: Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Step 3: Update vite.config.js**
Add the base path for your repository:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Match your repository name
})
```

**Step 4: Deploy**
```bash
npm run deploy
```

**Step 5: Enable GitHub Pages**
1. Go to repository Settings → Pages
2. Set source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Save

---

### Firebase Hosting

Google's hosting platform with global CDN.

**Step 1: Install Firebase CLI**
```bash
npm install -g firebase-tools
```

**Step 2: Login and Initialize**
```bash
firebase login
firebase init
```

Select:
- Hosting: Configure files for Firebase Hosting
- Public directory: `dist`
- Single-page app: Yes
- Overwrite index.html: No

**Step 3: Update firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Step 4: Deploy**
```bash
npm run build
firebase deploy
```

---

### Cloudflare Pages

Fast global deployment with Cloudflare's CDN.

**Step 1: Push to GitHub**
```bash
git push origin main
```

**Step 2: Connect to Cloudflare Pages**
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project" → "Connect to Git"
3. Select your repository
4. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"

---

### AWS S3 + CloudFront

For more control over infrastructure.

**Step 1: Build the project**
```bash
npm run build
```

**Step 2: Create S3 Bucket**
1. Create a new S3 bucket
2. Enable "Static website hosting"
3. Upload `dist` folder contents
4. Set index document to `index.html`

**Step 3: Configure CloudFront (Optional)**
1. Create CloudFront distribution
2. Point to S3 bucket
3. Configure error handling for SPA routing

---

## Environment Variables

If your portfolio uses environment variables:

1. Create `.env` file locally (already in `.gitignore`):
```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

2. Add variables to your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - GitHub Pages: Repository Settings → Secrets
   - Firebase: Use `.env` or runtime config

**Important**: Always prefix client-side variables with `VITE_`

---

## Custom Domain Setup

### Common DNS Records

**A Record (Apex Domain)**
```
Type: A
Name: @
Value: [Platform IP or CNAME target]
```

**CNAME Record (Subdomain)**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

### SSL/TLS Certificate

Most platforms provide free SSL:
- Vercel: Automatic
- Netlify: Automatic (Let's Encrypt)
- GitHub Pages: Automatic
- Firebase: Automatic

---

## Performance Optimization

### Before Deploying

1. **Optimize Images**
   - Use WebP format
   - Compress with tools like imagemin
   - Use appropriate dimensions

2. **Check Bundle Size**
```bash
npm run build
# Check the dist/ folder size
```

3. **Enable Compression**
Most platforms enable gzip/brotli automatically.

### After Deploying

1. **Run Lighthouse Audit**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for Performance, Accessibility, Best Practices, SEO

2. **Test Load Time**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Check Core Web Vitals

3. **Monitor Uptime**
   - Set up uptime monitoring
   - Use services like UptimeRobot or Pingdom

---

## Troubleshooting

### Build Fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Check for errors
npm run build --verbose
```

### Routing Issues (404 on refresh)

Ensure SPA redirects are configured:
- Netlify: `_redirects` file or `netlify.toml`
- Vercel: `vercel.json` with rewrites
- Firebase: `firebase.json` rewrites

### Blank Page After Deploy

1. Check browser console for errors
2. Verify `base` path in `vite.config.js`
3. Ensure all assets are in `dist` folder

### Slow Initial Load

1. Enable compression on hosting platform
2. Consider code splitting for large apps
3. Lazy load images and components
4. Use CDN for assets

---

## Continuous Deployment

### GitHub Actions (for GitHub Pages)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Vercel/Netlify Auto-Deploy

Both platforms automatically deploy on push to main branch. Configure branch protection rules for production stability.
