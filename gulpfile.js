'use strict';

var gulp = require('gulp');
var gulpCopy = require('gulp-copy');
var rename = require('gulp-rename');
var jsonMinify = require('gulp-json-minify');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var pump = require('pump');

gulp.task('ext', function() {
  gulp.src(['./ext/**/*'])
    .pipe(gulp.dest('./build'));
});

gulp.task('minify_json', function() {
  gulp.src(['./build/**/*.json'])
    .pipe(jsonMinify())
    .pipe(gulp.dest('./build'))
});

gulp.task('minify_js', function(cb) {
  gulp.src(['./build/**/*.js'])
    .pipe(minify({
      ext: {
        src:'.js',
        min:'.js'
      },
      ignoreFiles: ['.min.js']
    }))
    .pipe(gulp.dest('./build'))
})

gulp.task('minify_css', function() {
  gulp.src(['./build/**/*.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build'))
})

gulp.task('watch', function () {
  gulp.watch(['./ext/**/*'], ['ext']);
});

gulp.task('minifier', ['minify_json', 'minify_css']);
gulp.task('build', ['ext', 'minifier']);
gulp.task('default', ['build']);
