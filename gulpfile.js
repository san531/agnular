var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var htmlToJs = require('gulp-html-to-js');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');

gulp.task('default', ['views:compile', 'scripts'], function() {
    return browserify('dist/all.js')
        .bundle()
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('views.js'))
        .pipe(gulp.dest('./build/'));
});


gulp.task('views:compile', function() {
  return gulp.src('app/**/*.html')
    .pipe(minifyHtml())
    .pipe(htmlToJs({concat: 'views.js'}))
    .pipe(gulp.dest('node_modules'));
});





gulp.task('scripts', function() {
  return gulp.src(['./app/**/app.module.js', './app/**/shared.module.js', './app/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});