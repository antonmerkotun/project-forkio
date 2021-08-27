'use strict'

const {src, dest, series, watch} = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create(),
    gulpJsMinify = require('gulp-js-minify'),
    cleanCss = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

function clear() {
    return src('./dist')
        .pipe(clean())
}

function scss() {
    return src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 3 versions'))
        .pipe(cleanCss())
        .pipe(concat('styles.min.css'))
        .pipe(dest('./src/css'))
}

function css() {
    return src('./src/css/**/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(dest('./dist/style'))
}

function concatJs() {
    return src('./src/js/**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulpJsMinify())
        .pipe(dest('./dist/script'))
}

function image() {
    return src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'))
}

function serv() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
    watch('./src/scss/**.scss', series(scss, css)).on('change', browserSync.reload);
    watch('./src/js/**.js', series(concatJs)).on('change', browserSync.reload);
}

exports.build = series(clear, scss, css, concatJs, image)
exports.dev = series(scss, css, concatJs, serv)