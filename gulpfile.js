const gulp = require('gulp')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')

gulp.task('css', function() {
    const plugins = [cssnext({ browsers: ['> 1%', 'last 2 versions', 'iOS >= 7', 'Android >= 4'] })]
    return gulp
        .src('./src/components/**/*.less')
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./lib/'))
        .pipe(gulp.dest('./lib-esm/'))
})
