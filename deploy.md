# GitHub Pages Deployment Guide

## Quick Setup Steps

### 1. Create GitHub Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Laddoo It Yourself PDP"

# Rename branch to main
git branch -M main

# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ladoo.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub.com
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 3. Access Your Live Site
- **Main PDP**: `https://YOUR_USERNAME.github.io/ladoo/pdp.html`
- **Landing Page**: `https://YOUR_USERNAME.github.io/ladoo/`
- **Theme Showcase**: `https://YOUR_USERNAME.github.io/ladoo/theme-showcase.html`

## File Structure for GitHub Pages
```
ladoo/
├── pdp.html              ← Main Product Detail Page
├── index.html            ← Landing page
├── theme-*.html          ← Theme pages
├── styles.css            ← Base styles
├── theme-orange.css      ← Orange theme
├── pdp-styles.css        ← PDP styles
├── script.js             ← Main JavaScript
├── fireworks.js          ← Fireworks animation
├── fonts.css             ← Font imports
├── README.md             ← Project documentation
├── .gitignore            ← Git ignore rules
└── assets/               ← Images and fonts
    ├── Protein font and logo/
    ├── Dramaturg Font/
    └── futura_round_font/
```

## Important Notes
- ✅ All file paths are relative (compatible with GitHub Pages)
- ✅ No server-side code required
- ✅ All assets are included in the repository
- ✅ Works with custom domain (optional)

## Custom Domain (Optional)
To use a custom domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS settings to point to GitHub Pages
3. Enable "Enforce HTTPS" in repository settings

## Troubleshooting
- **404 Error**: Check that file paths are relative (no leading `/`)
- **Images not loading**: Verify image file names and paths
- **Styles not applied**: Check CSS file paths in HTML
- **Scripts not working**: Verify JavaScript file paths

## Updates
To update your site:
```bash
git add .
git commit -m "Update: [describe changes]"
git push origin main
```
Changes will be live within 1-2 minutes.
