// Include gulp & del
var gulp = require('gulp');
var del = require('del');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');
var fc2json = require('gulp-file-contents-to-json');
var modify = require('gulp-modify');
var mustache = require('gulp-mustache');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var fs = require('fs');

// load and clean config file
var config = fs.readFileSync('./src/js/config.js', 'utf-8');
config = config.replace(/define\(/g,'');
config = config.replace(/\);/g,'');
config = eval( '(' + config + ')' );

var dirs = {
    source: 'src',
    staging: 'staging',
    release: 'dist'
}

// Clean
gulp.task('clean', function (cb) {
    del([dirs.release], cb);
});

// Copy files
gulp.task('copy:html', function () {
    return gulp.src([dirs.source+'/*.html', '!'+dirs.source+'/login.html'])
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:images', function () {
    return gulp.src(dirs.source+'/images/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:scripts', function () {
    return gulp.src([
            dirs.source+'/vendor/jquery/dist/jquery.min.js',
            dirs.source+'/vendor/backbone/backbone-min.js',
            dirs.source+'/vendor/bootstrap/dist/js/bootstrap.min.js',
            dirs.source+'/vendor/underscore/underscore-min.js',
            dirs.source+'/vendor/requirejs/require.js',
            dirs.source+'/vendor/mustache.js/mustache.js',
            dirs.source+'/vendor/backgrid/lib/backgrid.js',
            dirs.source+'/vendor/chosen/chosen.jquery.js',
            dirs.source+'/vendor/chosen/chosen.css',
            dirs.source+'/vendor/chosen/chosen-sprite.png',
            dirs.source+'/vendor/chosen/chosen-sprite@2x.png',
            dirs.source+'/js/**/*'
        ]).pipe(copy(dirs.release, {prefix: 1}));
});

gulp.task('uglify', function() {
    return gulp.src([
            dirs.source+'/js/**/*',
            '!'+dirs.source+'/js/dummy/**/*'
        ])
    .pipe(uglify().on('error', function (err) {
        console.log(err);
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dirs.release + '/js'));
});

// Copy dummy data
gulp.task('copy:dummy', function () {
    return gulp.src(dirs.source+'/js/dummy/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});

// Render html mustache
gulp.task('copy:mustache', function () {
    return gulp.src(dirs.source+'/login.html')
        .pipe(mustache({
            appname: config.appname,
            version: config.apiversion,
            apiurl: config.apiurl,
            publicurl: config.publicurl,
            gearmanurl: config.gearmanurl
        }))
        .pipe(gulp.dest(dirs.release));
});

// Lint Tasks
gulp.task('lint:before', function () {
    return gulp.src(dirs.source+'/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Mustache template concat
gulp.task('mustache', function (){
    gulp.src(dirs.source+'/templates/**/*')
        //.pipe(minifyHTML())
        .pipe(fc2json('templates.js', {extname: false}))
        .pipe(modify({
            fileModifier: function(file, contents) {
                    return "Templates = "+contents;
                }
        }))
        .pipe(gulp.dest(dirs.release+'/templates'));
});

// Compile Sass
gulp.task('sass:staging', function () {
    return gulp.src(dirs.source+'/styles/main.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError)
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dirs.release+'/css'));
});
gulp.task('sass:stable', function () {
    return gulp.src(dirs.source+'/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError)
        )
        .pipe(cssnano())
        .pipe(gulp.dest(dirs.release+'/css'));
});

// Watch
gulp.task('watch', function () {
    gulp.watch(dirs.source+'/*.html', ['copy:html']);
    gulp.watch(dirs.source+'/js/**/*', ['copy:scripts', 'lint:before']);
    gulp.watch(dirs.source+'/styles/**/*', ['sass:staging']);
    gulp.watch(dirs.source+'/templates/**/*', ['mustache']);
    gulp.watch(dirs.source+'/js/Dummy/*', ['copy:dummy']);
});

// Build, staging and stable tasks
gulp.task('staging', function (callback) {
    runSequence('clean', ['copy:images', 'copy:dummy', 'copy:mustache', 'copy:html', 'copy:scripts', 'sass:staging', 'lint:before', 'mustache'], callback);
});
// stable not working
/*gulp.task('stable', function (callback) {
    runSequence('clean', ['copy:images', 'copy:dummy', 'copy:mustache', 'copy:html', 'copy:scripts', 'uglify', 'sass:stable', 'mustache'], callback);
});*/
gulp.task('default', ['staging', 'watch']);
