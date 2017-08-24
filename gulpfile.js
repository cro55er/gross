var gulp        = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concatCss = require('gulp-concat-css');

var urls = {
    baseDir: "app",
    html: "app/*.html",
    css: "app/css/*.css",
    sass: "app/sass/**/*.scss"
}

gulp.task('sass', function () {
  return gulp.src(urls.sass)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('css', ['sass'], function () {
  return gulp.src(['app/libs/**/*.css',
                   'app/css/**/*.css',
                   '!app/css/main.css'])
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.stream());
    console.log(gulp.src(['app/libs/**/*.css', 'app/css/**/*.css']));
});

// Static server
gulp.task('server', ['css'], function () {
    browserSync.init({
        server: {
            baseDir: urls.baseDir,
        },
        notify: false
    });

    gulp.watch(urls.html).on('change', browserSync.reload);
    gulp.watch(urls.sass, ['css']);
});

gulp.task('default', ['server']);
