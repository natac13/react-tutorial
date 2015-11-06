'use strict';
import gulp       from 'gulp';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';
import plumber    from 'gulp-plumber';
import notify     from 'gulp-notify';

const paths = {
    js: './src/main.js',
    dist: './public/js',
    html: './public/index.html'
}

gulp.task('build', function() {
    browserify({
            entries: paths.js,
            extensions: ['.jsx', '.js'],
            debug: true
        })
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(notify({message: "Generated file: <%= file.relative %>"}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);