# Laddoo It Yourself - Product Detail Page

A beautiful, responsive Product Detail Page (PDP) for the "Laddoo It Yourself" protein DIY kit by Origin Nutrition. This project showcases a modern, festive-themed landing page with interactive elements and animations.

## 🌟 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Festive Theme**: Orange color scheme (#f26521) with Diwali-inspired design
- **Interactive Elements**: 
  - Fireworks animation in hero section
  - Hover effects on cards and buttons
  - Animated laddoo showcase
- **Modern Layout**: 
  - Grid-based sections for "How to Make" and "Pack Options"
  - Centered corporate orders section
  - Icon-enhanced ingredient list
- **Typography**: Custom fonts including Great Vibes, Dancing Script, and Cabinet Grotesk
- **Accessibility**: Clean, readable design with proper contrast ratios

## 📁 Project Structure

```
ladoo/
├── index.html              # Main landing page
├── pdp.html               # Product Detail Page (main focus)
├── theme-*.html           # Theme showcase pages
├── styles.css             # Base styles
├── theme-orange.css       # Orange theme colors
├── pdp-styles.css         # PDP-specific styles
├── script.js              # Main JavaScript functionality
├── fireworks.js           # Fireworks animation script
├── fonts.css              # Font imports
├── brand color.png        # Brand assets
├── Protein font and logo/ # Logo assets
├── Dramaturg Font/        # Custom fonts
└── futura_round_font/     # Custom fonts
```

## 🚀 GitHub Pages Deployment

### Method 1: Automatic Deployment (Recommended)

1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Laddoo It Yourself PDP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ladoo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Site**:
   - Your site will be available at: `https://YOUR_USERNAME.github.io/ladoo/`
   - The main PDP will be at: `https://YOUR_USERNAME.github.io/ladoo/pdp.html`

### Method 2: Using GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🎨 Customization

### Changing Colors
Edit `theme-orange.css` to modify the color scheme:
```css
:root {
    --primary-color: #f26521;    /* Main orange */
    --secondary-color: #ff8c42;  /* Secondary orange */
    --accent-color: #ffe4d6;     /* Light orange */
}
```

### Adding New Sections
1. Add HTML structure in `pdp.html`
2. Add corresponding styles in `pdp-styles.css`
3. Follow the existing grid and spacing patterns

### Modifying Animations
- Fireworks: Edit `fireworks.js`
- CSS animations: Modify keyframes in `pdp-styles.css`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ladoo.git
   cd ladoo
   ```

2. **Open in browser**:
   - Simply open `pdp.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Access locally**:
   - Main PDP: `http://localhost:8000/pdp.html`
   - Theme showcase: `http://localhost:8000/theme-showcase.html`

## 📄 Pages Overview

- **`pdp.html`**: Main Product Detail Page with all features
- **`index.html`**: Landing page
- **`theme-*.html`**: Individual theme showcase pages
- **`theme-showcase.html`**: Theme comparison page

## 🎯 Key Sections

1. **Hero Section**: Animated title with fireworks
2. **Festivals Section**: Brand messaging
3. **What's Inside**: Ingredient showcase with icons
4. **How to Make**: 3-step process in grid layout
5. **Video Block**: USP highlights
6. **Pack Options**: 3-column pricing grid
7. **Corporate Orders**: Centered bulk order information

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact: hello@originnutrition.in

## 📜 License

This project is created for Origin Nutrition. All rights reserved.

---

**Origin Nutrition** - Making tradition healthier, one laddoo at a time! 🍡
