/**
 * Gulp configuration file
 *
 * @version 1.0
 */
'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({lazy: true});

const srcs = [
    'app.js', 'routes.js',
    'config/**/*.js',
    'controllers/**/*.js',
    'helpers/**/*.js',
    'models/**/*.js',
    'data/**/*.js'
];

gulp.task('test', function () {
  return gulp.src(['test/*.js'], { read: false })
      .pipe($.mocha({
          reporter: 'spec',
          timeout: 60000
      }));

});

gulp.task('lint', function() {
  return gulp.src(srcs)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('default', ['lint']);