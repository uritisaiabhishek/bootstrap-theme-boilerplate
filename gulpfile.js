const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');
const ghPages = require('gh-pages');  // Import gh-pages

// Paths
const paths = {
    scss: './src/assets/scss/**/*.scss',
    js: './src/assets/js/**/*.js',
    html: './src/**/*.html',
    images: './src/assets/images/**/*',
    includes: './includes/**/*.html',  // Include header.html
    dist: './build/',  // Output to the build folder
};

// Compile SCSS to CSS
function styles() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(`${paths.dist}assets/css`))
        .pipe(browserSync.stream());
}

// Minify JS and include Bootstrap and Popper.js
function scripts() {
    return gulp.src([paths.js, './node_modules/@popperjs/core/dist/umd/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(`${paths.dist}assets/js`));
}

// Minify and include partials (header.html)
function html() {
    return gulp.src(paths.html)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.dist));
}

// Copy images to build folder
function images() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(`${paths.dist}assets/images`));
}

// Watch for changes
function serve() {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });
    gulp.watch(paths.scss, styles);
    gulp.watch(paths.js, scripts).on('change', browserSync.reload);
    gulp.watch(paths.html, html).on('change', browserSync.reload);
    gulp.watch(paths.images, images).on('change', browserSync.reload);
    gulp.watch(paths.includes, html).on('change', browserSync.reload);  // Watch for changes in includes
}

// Deploy to GitHub Pages
function deploy(cb) {
    ghPages.publish(paths.dist, cb);  // Push build folder to gh-pages branch
}

// Define tasks
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.serve = serve;
exports.deploy = deploy;  // Export deploy task

// Default task
exports.default = gulp.series(gulp.parallel(styles, scripts, html, images), serve);

// Build task
exports.build = gulp.series(gulp.parallel(styles, scripts, html, images));

// Deploy task
exports.deploy = gulp.series(exports.build, deploy);  // Build and deploy to GitHub Pages
