'use strict';

const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const plumber = require('gulp-plumber');
const rename  = require('gulp-rename');
const uglify  = require('gulp-uglify');
const babel   = require('gulp-babel');

gulp.task('js:build', function() {
  return gulp
    .src(['./src/**/*.js', '!./src/**/*.min.js'])
    .pipe(babel({ presets: ["@babel/preset-env"].map(require.resolve) }))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./src'));
});

gulp.task('js:lint', function() {
  return gulp
    .src(['./src/**/*.js', '!./src/**/*.min.js'])
    .pipe(plumber())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', gulp.parallel(['js:lint', 'js:build']));

gulp.task('default', function() {
  gulp.watch('./src/pig.js', gulp.parallel(['build']));
});
