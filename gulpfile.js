/**
 * Created by Михаил on 21.03.2017.
 */
    var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/html/',
        js: 'build/js/',
        css: 'build/style/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    app: {
        html: 'app/html/*.html',
        js: 'app/js/*.js',
        style: 'app/style/main.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        html: 'app/html/*.html',
        js: 'app/js/*.js',
        style: 'app/style/main.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './build'
};


gulp.task('html', function() {
      gulp.src(path.app.html)
          .pipe(rigger())
          .pipe(gulp.dest(path.build.html))
          .pipe(reload({stream:true}))
});
gulp.task('js', function() {
    gulp.src(path.app.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}))
});
gulp.task('style', function () {
    gulp.src(path.app.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('image', function () {
    gulp.src(path.app.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts', function() {
    gulp.src(path.app.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build',['html','js','style','image','fonts']);

gulp.task('watch', function() {
    watch([path.watch.html], function (event, cb) {
        gulp.start('build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('build');
    });
});