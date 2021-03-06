/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')

const config = require('./config.json')

gulp.task('copy-assets', function () {
  return gulp.src([
    `${config.paths.assets}/**`,
    `!${config.paths.assets}/sass/**`
  ])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-documentation', function () {
  return gulp.src([
    `${config.paths.docsAssets}/**`,
    `!${config.paths.docsAssets}/sass/**`
  ])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-autocomplete', function () {
  return gulp.src([
    'node_modules/accessible-autocomplete/dist/*.js',
    'node_modules/accessible-autocomplete/dist/*.css',
    'node_modules/accessible-autocomplete/dist/*.map'
  ])
    .pipe(gulp.dest(`${config.paths.public}/accessible-autocomplete/`))
})
