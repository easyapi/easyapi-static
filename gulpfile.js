var path = require('path');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var nano = require('gulp-cssnano');
var header = require('gulp-header');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat"); //文件合并
var pkg = require('./package.json');
var plumber = require('gulp-plumber');
var flatten = require('gulp-flatten');
var runSequence = require('gulp-sequence');
var del = require('del');
var reload      = browserSync.reload;


// 静态服务器

gulp.task('serve', function(cb) {
    runSequence('cssclean','style:less','style:min','sitestyle:less','sitestyle:min', cb);
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: 'easyapi-market/src/main/resources/templates/'
    });
    gulp.watch(__dirname + "/less/*.less", ['build:style']);
    gulp.watch([__dirname + "easyapi-market/src/main/resources/templates/*/*.html",__dirname + "/less/*.less"]).on('change', reload);
});


gulp.task('build:style', function(cb) {
    runSequence('cssclean','style:less','style:min', 'sitestyle:less','sitestyle:min',cb);
});

//时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

var day = getNowFormatDate();
gulp.task('cssclean', function() {
    // Return the Promise from del()
    return del(__dirname + '/css');
});


gulp.task('style:less', function () {
    return     gulp.src(__dirname + '/less/market.less')
    //.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))

        .pipe(flatten())
        .pipe(gulp.dest(__dirname + '/css'));
});
gulp.task('sitestyle:less', function () {
    return     gulp.src(__dirname + '/less/site.less')
    //.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))

        .pipe(flatten())
        .pipe(gulp.dest(__dirname + '/css'));
});





gulp.task("style:min",function () {
    var banner = [
        '/*!',
        ' * easyapi-market v<%= pkg.version %>',
        ' * @time <%=  name %>',
        ' */',
        ''
    ].join('\n');
    return  gulp.src(__dirname + '/css/market.css')
        .pipe(plumber())
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))

        .pipe(rename(function (path) {
            path.basename += '.min';
        }))

        .pipe(header(banner, {
            pkg: pkg,
            name: day
        }))

        .pipe(gulp.dest(__dirname + '/css/'))
        .pipe(browserSync.reload({stream: true}));

})
gulp.task("sitestyle:min",function () {
    var banner = [
        '/*!',
        ' * easyapi-market v<%= pkg.version %>',
        ' * @time <%=  name %>',
        ' */',
        ''
    ].join('\n');
    return  gulp.src(__dirname + '/css/site.css')
        .pipe(plumber())
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))

        .pipe(rename(function (path) {
            path.basename += '.min';
        }))

        .pipe(header(banner, {
            pkg: pkg,
            name: day
        }))

        .pipe(gulp.dest(__dirname + '/css/'))
        .pipe(browserSync.reload({stream: true}));

})



gulp.task('default', ['serve']);