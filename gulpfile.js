"use strict";
const state = 'development'; // production || development (remember to do a ctrl-f 'production')

////////////////////
// plugins
////////////////////

/* _this_ thing */
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
/* removal of stuff (aka, make clean :p) */
const del = require('del');
/* talk to the browser (aka, reload it on file changes) */
const browserSync = require('browser-sync').create();

/* babel = using those es6 / ECMAScript 2015 features */
/* babelify = babel that works easily with browserify */
const babelify = require('babelify');
/* browserify = packages & bundles requires for distribution */
const browserify = require('browserify');

/* some plugins used expect vinyl file objects / buffered objects */
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const glob = require('glob');

////////////////////
// paths
////////////////////

let path = {
  JS_MAIN: 'src/js/app.js',
  JS: 'src/js/**',
  SASS_MAIN: 'src/sass/main.scss',
  CSS: 'dist/css',
  STATIC: 'src/static/**',
  DEST: 'dist',
  init() {
    // preprocessing ALL (it's a composite)
    this.ALL = [];
    this.ALL.push(this.STATIC);
    this.ALL.push(this.JS);
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
/* watch for sass / scss changes */
gulp.watch(path.SASS, ['sass']);


////////////////////
// tasks
////////////////////

gulp.task('default', ['set-env', 'everything', 'browser-sync']);

// gulp.task('js-reload', ['everything'], browserSync.reload); // DOES NOT WORK??
gulp.task('js-reload', ['everything'], () => {
  browserSync.reload();
});

gulp.task('everything', ['babelify', 'copy', 'sass']);

gulp.task('babelify', () => {
  let bundler = browserify(path.JS_MAIN, { debug: true });

  bundler.transform(babelify, {presets: ['es2015', 'react']});

  return bundler.bundle()
                .on('error', function(err) { console.error(err); this.emit('end'); })
                .pipe(source('bundle.js'))
                .pipe(buffer())
    //                .pipe(concat('bundle.min.js'))  // uncomment for production (change all refs to bundle.min.js as well!)
    //                .pipe(uglify()) // uncomment for production
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

gulp.task('set-env', () => {
  return process.env.NODE_ENV = state;
});

gulp.task('sass', () => {
  return gulp.src(path.SASS_MAIN)
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest(path.CSS))
             .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', () => {
  return del([path.DEST]);
});
