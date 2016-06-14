// ==== GULPFILE ==== //


gulp = require('gulp');
gulp.config = require('./../lib/loadconfig');
gulp.plugins = require('gulp-load-plugins')({ camelize: true });

var requireDir = require('require-dir');

requireDir('./tasks/global'); //tasks which don't depend on project/config

gulp.task('default', function(cb) {
    gulp.log('No project is found!');
});

if (gulp.config.isLoaded) {
    requireDir('./tasks');

    gulp.task('rebuild', gulp.series('build', 'content', 'layouts:copy', 'styles' , 'images', 'scripts' , 'layouts'));

    gulp.task('dist', gulp.series('rebuild', 'dist:clean', 'dist:copy', 'dist:configs'));

    gulp.task('default', gulp.series('rebuild', 'serve'));
}


