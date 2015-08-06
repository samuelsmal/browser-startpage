var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    minifyHTML = require('gulp-minify-html'),
    haml = require('gulp-haml'),
    del = require('del');

gulp.task('html', function() {
  return gulp.src('src/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('build'))
    .pipe(notify({ message: 'HTML task complete' }))
});

gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(notify({ message: 'Images task complete' })); 
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.haml', ['html'])
  gulp.watch('src/styles/**/*.scss', ['styles'])
  gulp.watch('src/images/**/*.', ['images'])


  livereload.listen()

  gulp.watch(['dist/**']).on('change', livereload.changed)
});

gulp.task('default', function() {
  gulp.start('styles', 'images')
});


