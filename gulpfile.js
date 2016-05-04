////////////////////
// plugins
////////////////////

/* _this_ thing */
const gulp = require('gulp');
/* removal of stuff (aka, make clean :p) */
const del = require('del');
/* talk to the browser (aka, reload it on file changes) */
const browserSync = require('browser-sync').create();

/* babel = using those es6 / ECMAScript 2015 features */
/* babelify = babel that works easily with browserify */
const babelify = require('babelify');
/* browserify = packages & bundles requires for distribution */
const browserify = require('browserify');

/* some plugins used expect vinyl file objects / streams */
const source = require('vinyl-source-stream');

////////////////////
// paths
////////////////////

var path = {
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  JS_MAIN: 'src/js/app.js',
  STATIC: 'src/static/**',
  DEST: 'dist',
  init() {
    // preprocessing ALL (it's a composite)
    this.ALL = [];
    this.ALL.push(this.STATIC);
    this.ALL.push.apply(this.ALL, this.JS);
    return this;
  },
}.init();

////////////////////
// events
////////////////////

/* static content changes = reload browserSync */
gulp.watch(path.STATIC).on('change', browserSync.reload);
/* js content changes = rebundle & reload browserSync */
gulp.watch(path.JS, ['js-reload']);

////////////////////
// tasks
////////////////////

gulp.task('default', ['everything', 'browser-sync']);

// gulp.task('js-reload', ['everything'], browserSync.reload); // DOES NOT WORK??
gulp.task('js-reload', ['everything'], () => {
  browserSync.reload();
});

gulp.task('everything', ['babelify', 'copy']);

gulp.task('babelify', () => {
  var bundler = browserify('src/js/app.js', { debug: true });
  bundler.transform(babelify, {presets: ['es2015', 'react']});

  return bundler.bundle()
                .on('error', function(err) { console.error(err); this.emit('end'); })
                .pipe(source('bundle.js'))
                .pipe(gulp.dest(path.DEST));
});

gulp.task('copy', () => {
  return gulp.src(path.STATIC)
             .pipe(gulp.dest(path.DEST));
});

/* serve files */
gulp.task('browser-sync', () => {
    browserSync.init({
    port: 3000,
    open: false, // do not open browser

    server: {
      baseDir: path.DEST,
    },
    ui: {
      port: 3001,
    },
  });
});

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', () => {
  del(['dist/**']);
});
