const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require("browser-sync").create();

// File paths
const files = {
	scssPath: 'src/scss/**/*.scss',
  publicPath: '_site',
  distPath: '_site'
};




function style() {
  // 1. where is my scss file
  return gulp.src(files.scssPath, { sourcemaps: true })
  // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
  // 3. PostCSS plugins
    .pipe(postcss([ autoprefixer() ]))
  // 4. where do I save the compiled CSS?
    .pipe(gulp.dest(files.distPath))
  // 5. stream changes to all browser
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: files.publicPath
    }
  });

  gulp.watch(files.scssPath, style);
  gulp.watch(files.publicPath + '/*.html').on('change', browserSync.reload);
}


exports.watch = watch;
exports.build = style;