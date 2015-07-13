/**
 * @file gulpfile
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Jim-B
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var minCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var sassPath = 'src/sass/**/*.scss';
var sassInput = 'src/sass/main.scss';

gulp.task('buildStyle', function(){
  gulp.src(sassInput)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(minCss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', function() {
  gulp.watch(sassPath, ['buildStyle'])
})