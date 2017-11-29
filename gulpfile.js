const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

// Concatenate and minify scripts in the src directory
gulp.task('sass', function () {
  return gulp.src('./public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


// Watch any changes in the src directory
gulp.task('watch', function() {
	gulp.watch('./public/scss/*.scss', ['sass']);
});


// Set the default gulp task to "watch"
gulp.task('default', ['sass', 'watch']);