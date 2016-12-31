/**
 * Gulp configuration file
 *
 * @version 1.0
 */
'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

const $ = require('gulp-load-plugins')({lazy: true});

gulp.task('test', function () {
  return gulp.src(['test/*.js'])
      .pipe($.mocha({
        timeout: 60000
      }))
      .pipe($.istanbul.writeReports());
      // .pipe($.exit());
});

gulp.task('lint-backend', function() {
  return gulp.src(['src/**/*.js', 'data/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('lint', ['lint-backend']);
gulp.task('default', ['lint-backend']);