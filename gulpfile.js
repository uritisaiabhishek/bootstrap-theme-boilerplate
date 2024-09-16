const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

// Paths
const paths = {
    scss: './src/assets/scss/**/*.scss',
    js: './src/assets/js/**/*.js',
    html: './src/**/*.html',
    images: './src/assets/images/**/*',  // Path for images
    dist: './build/',
    bootstrapJS: './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    popperJS: './node_modules/@popperjs/core/dist/umd/popper.min.js'
};

// Copy images to build folder
function images() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(`${paths.dist}assets/images`));
}

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
    return gulp.src([paths.js, paths.popperJS, paths.bootstrapJS])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))  // Concatenate all JS files
        .pipe(terser())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(`${paths.dist}assets/js`));
}

// Minify HTML
function html() {
    return gulp.src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.dist));
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
}

// Define tasks
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.serve = serve;

// Default task
exports.default = gulp.series(gulp.parallel(styles, scripts, html, images), serve);

// Build task
exports.build = gulp.series(gulp.parallel(styles, scripts, html, images));
