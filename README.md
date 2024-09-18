# Bootstrap Theme Boilerplate

This is an advanced boilerplate setup using **Gulp** to automate tasks for building Bootstrap themes. It integrates multiple packages to enhance the development workflow by optimizing styles, scripts, and HTML, while allowing easy deployment to GitHub Pages.

## Features

- **Bootstrap 5.3.3**: Latest version of Bootstrap for responsive, mobile-first designs.
- **Sass**: SCSS for powerful styling with variables, mixins, and nested rules.
- **Gulp**: Task runner for automating and speeding up the development process.
- **BrowserSync**: Live reloading and browser synchronization across devices.
- **gh-pages**: Easy deployment to GitHub Pages.

## Packages Used

### Dev Dependencies

1. **gulp**: Automates repetitive tasks such as compiling Sass, minifying CSS/JS, and more.
2. **browser-sync**: Provides a local development server with live reloading capabilities.
3. **gulp-sass**: Compiles SCSS files into CSS. Sass is an industry-standard preprocessor for enhanced CSS functionality.
4. **gulp-clean-css**: Minifies CSS files, reducing file size for production.
5. **gulp-terser**: Minifies JavaScript files to optimize load time.
6. **gulp-htmlmin**: Compresses HTML files by removing extra spaces and comments.
7. **gulp-rename**: Appends a `.min` suffix to the minified CSS and JS files.
8. **gulp-sourcemaps**: Generates sourcemaps for easier debugging of compiled CSS/JS.
9. **gulp-concat**: Concatenates multiple JS files into a single bundle for simplicity.
10. **gulp-file-include**: Allows inclusion of partial HTML files, making layouts modular (e.g., reusable headers).
11. **gh-pages**: Automatically deploys the `build` folder to a `gh-pages` branch on GitHub, enabling easy hosting on GitHub Pages.

### Dependencies

1. **bootstrap**: Framework for building responsive, mobile-first websites.
2. **@popperjs/core**: Required for Bootstrap’s dropdowns and tooltips.
3. **sass**: The core Sass package used by `gulp-sass` for compiling SCSS.

## Why It's Advanced

This boilerplate is designed for advanced use cases, providing several key features for modern web development:

1. **Modular HTML with Partials**: With `gulp-file-include`, you can use partials (e.g., `header.html`) to reuse sections across multiple pages, making it easier to maintain large projects.
2. **Automatic SCSS Compilation**: The Gulp workflow compiles SCSS files into minified CSS with sourcemaps, allowing you to write maintainable styles and optimize them for production.
3. **JS Minification and Concatenation**: Using `gulp-terser` and `gulp-concat`, this setup bundles and minifies your JavaScript files, improving load times for users.
4. **Live Reloading with BrowserSync**: Every change made in your SCSS, JS, or HTML files is instantly reflected in the browser, providing a fast feedback loop during development.
5. **Deploy to GitHub Pages**: With the `gh-pages` package, deploying your theme to GitHub Pages is just a command away.

## Getting Started

### Prerequisites

- Node.js
- NPM (or Yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/uritisaiabhishek/bootstrap-theme-boilerplate.git
   cd bootstrap-theme-boilerplate
    ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Development
  ```bash
   npm run dev
  ```
4. Build for Production
  ```bash
  npm run build
  ```
5. Folder Structure

/build              # Compiled production-ready files (CSS, JS, images, etc.)
/src
  ├── assets
  │   ├── scss      # SCSS files
  │   ├── js        # JavaScript files
  │   └── images    # Image assets
  ├── includes      # HTML partials (e.g., header.html)
  └── index.html    # Main HTML file

6. License
