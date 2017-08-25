var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    concatCss    = require('gulp-concat-css'),
    postCss      = require('gulp-postcss'),
    imagemin     = require('gulp-imagemin'),
    uglify       = require('gulp-uglifyjs'),
    autoprefixer = require('autoprefixer'),
    clean        = require('gulp-clean'),
    rename       = require('gulp-rename'),
    htmlreplace  = require('gulp-html-replace'),
    cssnano      = require('cssnano');

var urls = {
    baseDir: "app",
    html: "app/*.html",
    css: "app/css/*.css",
    sass: "app/sass/**/*.scss"
}

gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean', 'css'], function() {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano(),
    ];

    gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src(urls.html)
        .pipe(htmlreplace({
            'css': 'css/styles.min.css',
            'js' : 'js/scripts.min.js'
        }))
        .pipe(gulp.dest('dist/'));

    gulp.src('app/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));

    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('dist/js/'))

    gulp.src('app/css/main.css')
        .pipe(postCss(processors))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

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
