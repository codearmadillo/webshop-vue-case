const gulp = require('gulp'),
        sass = require('gulp-sass'),
        gutil = require('gulp-util'),
        autoprefixer = require('autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        postcss = require('gulp-postcss');

const dependencies = {
    stylesheet: Array(
        "src/scss/*.scss",
        "src/scss/**/*.scss"
    )
}
const input = {
    stylesheet: "src/scss/default.scss"
}
const output = {
    production: 'public/production/',
    development: 'public/build/'
}

gulp.task('default', ['watch']);
gulp.task('watch', ['scss'], function(){
    gulp.watch(dependencies.stylesheet, ['scss']);
});
gulp.task('scss', function() {
    return gulp.src(input.stylesheet)
        .pipe(gutil.env.type !== 'production' ? sourcemaps.init() : gutil.noop())
        .pipe(sass({outputStyle: gutil.env.type !== 'production' ? 'nested' : 'compressed'}).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gutil.env.type !== 'production' ? sourcemaps.write() : gutil.noop())
        .pipe(gutil.env.type !== 'production' ? gulp.dest(output.development) : gulp.dest(output.production));
});