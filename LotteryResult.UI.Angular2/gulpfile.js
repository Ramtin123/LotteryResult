const gulp = require('gulp');
const typescript = require('gulp-typescript');
var tsProject = typescript.createProject("tsconfig.json");
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const tsconfig = require('tsconfig-glob');
const gnf = require('gulp-npm-files');


gulp.task('copy:NpmDependencies', function () {
  gulp.src(gnf(), { base: './' }).pipe(gulp.dest('dist'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
  return gulp.src(['src/**/*', 'index.html', 'systemjs.config.js', 'styles.css', '!src/**/*.ts'], { base: './' })
    .pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', function () {
  return gulp.src([
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js'
  ])
    .pipe(gulp.dest('dist/lib'))
});


gulp.task("compile", function () {
  var tsResult = gulp.src(['src/**/*.ts', 'typings/**/*.d.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dist/src'));
});

// Run browsersync for development
gulp.task('serve', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['src/**/*', 'index.html', 'styles.css'], ['buildAndReload']);
});

gulp.task('build', ['compile', 'copy:assets', 'copy:NpmDependencies', 'copy:libs']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);
