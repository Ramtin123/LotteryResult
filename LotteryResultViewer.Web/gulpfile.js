/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-uglifycss');
var rename = require("gulp-rename");
var es = require('event-stream');
var flatten = require('gulp-flatten');
var watch = require('gulp-watch');
var config = require('./configuration');

function GulpFactory(env) {

    function GulpFactoryConstructor() {
        this.Env = env;
        this.public = './public/';
        this.publicProd = this.public + 'prod/'
        this.ScriptsPath = {
            vendor: this.public + 'vendors/scripts/',
            applicatin: this.public + 'application/scripts/'
        };
        this.CssPath = {
            vendor: this.public + 'vendors/styles/',
            application: this.public + 'application/styles/'
        };
        this.Views = './Views/Shared';
        this.WatchInjectPlaces = ['./public/application/scripts/**/*',
            './public/application/styles/**/*',
            './public/vendors/scripts/**/*',
            './public/vendors/styles/**/*'];
    }

    GulpFactoryConstructor.prototype._getScripts = function () {
        return [this.ScriptsPath.vendor + 'jquery*.js',
            this.ScriptsPath.vendor + 'angular.js',
            this.ScriptsPath.vendor + 'angular*.js',
            this.ScriptsPath.vendor + 'bootstrap*.js',
            this.ScriptsPath.vendor + 'ui-bootstrap.min.js',
            this.ScriptsPath.vendor + 'ui-bootstrap-tpls.min.js',
            this.ScriptsPath.vendor + 'pdfmake.js',
            this.ScriptsPath.vendor + 'lodash.js',
            this.ScriptsPath.vendor + 'vfs_fonts.js',
            this.ScriptsPath.vendor + 'angularchart/Chart.js',
            this.ScriptsPath.vendor + 'angularchart/angular-chart.js',
            this.ScriptsPath.vendor + '**/*.js',
            this.ScriptsPath.applicatin + 'common/*.js',
            this.ScriptsPath.applicatin + 'common/**/*.js',
            this.ScriptsPath.applicatin + '**/*.js'
        ];
    }


    GulpFactoryConstructor.prototype._getCss = function () {
        return [this.CssPath.vendor + '/**/*.css',
            this.CssPath.application + '*.css'
        ];
    }

    GulpFactoryConstructor.prototype._getIndex = function () {
        return this.Views + '_LayoutBuild.cshtml';
    }

    GulpFactoryConstructor.prototype._concatScripts = function () {
        var self = this;
        return function () {
            return gulp.src(self._getScripts())
                .pipe(concat('scripts.js'))
                .pipe(gulp.dest(self.publicProd));
        }
    }

    GulpFactoryConstructor.prototype._uglyScripts = function () {
        var self = this;
        return function () {
            return gulp.src(self.publicProd + 'scripts.js')
                .pipe(uglify())
                .pipe(rename('scripts.min.js'))
                .pipe(gulp.dest(self.publicProd));
        }
    }

    GulpFactoryConstructor.prototype._concatCss = function () {
        var self = this;
        return function () {
            return gulp.src(self._getCss())
                .pipe(concatCss('styles.css'))
                .pipe(gulp.dest(self.publicProd));
        }
    }

    GulpFactoryConstructor.prototype._uglyCss = function () {
        var self = this;
        return function () {
            return gulp.src(self.publicProd + 'styles.css')
                .pipe(uglifyCss())
                .pipe(rename('styles.min.css'))
                .pipe(gulp.dest(self.publicProd));
        }
    }

    GulpFactoryConstructor.prototype._inject = function () {
        var self = this;
        return function () {
            var scripts = gulp.src((self && self.Env === 'PROD' ? self.publicProd + 'scripts.min.js' : self._getScripts()));
            var styles = gulp.src((self && self.Env === 'PROD' ? self.publicProd + 'styles.min.css' : self._getCss()));

            return gulp.src(self._getIndex()).pipe(inject(scripts, {
                transform: function (filePath, file, i, length) {
                    var newPath = filePath + '?version=' + config.Version;
                    return '<script src="' + newPath + '"></script>';
                }
            }))
                .pipe(inject(styles, {
                    transform: function (filePath, file, i, length) {
                        var newPath = filePath + '?version=' + config.Version;
                        return '<link rel="stylesheet" href="' + newPath + '">';
                    }
                }))
                .pipe(rename('_Layout.cshtml'))
                .pipe(gulp.dest(self.Views));
        }
    }

    GulpFactoryConstructor.prototype._watch = function () {
        var self = this;
        return function () {
            function RebuildIndex() {
                self._inject()();
                console.log('Rebuild index!!!');
            }
            if (self.Env !== 'PROD') {
                gulp.watch(self._getIndex(), RebuildIndex);
                watch(self.WatchInjectPlaces).on('add', RebuildIndex);
                watch(self.WatchInjectPlaces).on('unlink', RebuildIndex);
            }
        }
    }

    //GulpFactoryConstructor.prototype._serv = function () {
    //    return function () {
    //        //server.run('app.js');
    //    }
    //}

    var gulpObj = new GulpFactoryConstructor();

    return {
        self: gulpObj,
        ConcatScripts: gulpObj._concatScripts(),
        ConcatCss: gulpObj._concatCss(),
        UglyScripts: gulpObj._uglyScripts(),
        UglyCss: gulpObj._uglyCss(),
       // Serv: gulpObj._serv(),
        Inject: gulpObj._inject(),
        Watch: gulpObj._watch()
    }
}


gulp.task('default', ['build:dev'], function () {

});

gulp.task('ConcatScripts', GulpFactory().ConcatScripts);

gulp.task('ConcatCss', GulpFactory().ConcatCss);

gulp.task('CopyAssets', function () {
    var gulpLib = GulpFactory().self;
    return gulp.src(['!' + gulpLib.CssPath.vendor + '**/*.css', gulpLib.CssPath.vendor + '**/*.*'])
        .pipe(gulp.dest(gulpLib.publicProd));
});

gulp.task('watch:dev', GulpFactory().Watch);

gulp.task('watch:prod', GulpFactory('PROD').Watch);

gulp.task('UglyScripts', ['ConcatScripts'], GulpFactory().UglyScripts);

gulp.task('UglyCss', ['ConcatCss'], GulpFactory().UglyCss);

gulp.task('Inject:DEV', GulpFactory().Inject);

gulp.task('Inject:PROD', ['UglyScripts', 'UglyCss'], GulpFactory('PROD').Inject);

gulp.task('build:dev', ['Inject:DEV']);

gulp.task('build:prod', ['Inject:PROD', 'CopyAssets']);

//gulp.task('serv:dev', ['build:dev', 'watch:dev'], GulpFactory().Serv);

//gulp.task('serv:prod', ['build:prod'], GulpFactory('PROD').Serv);
