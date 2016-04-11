/**
 * @authors Binson (yongbingzhang@Ctrip.com)
 * @date    2016-04-06 20:03:11
 * @version v1.0
 */

var gulp = require('gulp'),
    os = require('os'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    mincssmin = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    gulpWebpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js'),
    connect = require('gulp-connect');


// 路径缓存
var _src = './src',
    _bulid = './dist';

var srcPath = {
  src: _src,
  app: _src+'/views',
  appinc: _src+'/appinc',
  css: _src+'/css',
  sass: _src+'/css/sass',
  images: _src+'/images',
  js: _src+'/js',
  module: _src+'/js/module',
  lib: _src+'/js/lib'
};

var bulidPath = {
    bulid: _bulid,
    app: _bulid+'/views',
    css: _bulid+'/css',
    images: _bulid+'/images',
    js: _bulid+'/js',
    lib: _bulid+'/js/lib'
};

var host = {
    //path: srcPath.src,
    port: 3000,
    //html: 'index.ejs',
    url: 'http://localhost:3000/'
};

//mac chrome: "Google chrome",
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

/********sass处理*********/
var sass = require('gulp-sass');
gulp.task('sass', function () {
  return gulp.src(srcPath.sass +'/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(srcPath.css));
});

var compass = require('gulp-compass');
gulp.task('compass', function(done) {
  gulp.src(srcPath.sass +'/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: srcPath.css,
      sass: srcPath.sass
    }))
    .on('end', done);
    //.pipe(connect.reload());
    //.pipe(gulp.dest(bulidPath.css));
});

//将图片拷贝到目标目录
gulp.task('copy:images', function () {
    gulp.src([srcPath.images+'/**/*'])
        .pipe(gulp.dest(bulidPath.images));
});

//压缩合并css
gulp.task('cssmin',['compass'],function () {
    gulp.src(srcPath.css+'/*.css')
        .pipe(mincssmin())
        .pipe(gulp.dest(bulidPath.css));
});

//压缩js
gulp.task('jsmin',function () {
    gulp.src(srcPath.js+'/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(bulidPath.js));
});

gulp.task('html', function (done) {
    gulp.src('')
        .on('end', done)
        //.pipe(connect.reload());
});

//将html拷贝到目标目录
gulp.task('copy:html', function () {
    gulp.src([srcPath.app+'/*.html'])
        .pipe(gulp.dest(bulidPath.app));
});

//webpack 处理
gulp.task('webpack',function(done){
  return gulp.src('')
             .pipe(gulpWebpack(webpackConfig))
             .pipe(gulp.dest(srcPath.js));
             //.pipe(connect.reload());
});

gulp.task('clean', function () {
    gulp.src([
      bulidPath.bulid,
      srcPath.css+'/*.css',srcPath.css+'/*.map',
      srcPath.js+'/*.js',srcPath.js+'/*.map'
      ]).pipe(clean());
});

gulp.task('watch', function (done) {
    gulp.watch(srcPath.sass +'/**/*.scss',['compass']);
    gulp.watch(srcPath.module+'/**/*',['webpack']);
});

//启动静态服务器
gulp.task('connect', function () {
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});
gulp.task('open', function () {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: host.url
        }));
});


//开发
//gulp.task('dev', ['connect','compass','html:include','webpack','open'],function(){
gulp.task('dev', ['compass','webpack','watch'],function(){
  //gulp.start(['watch']);
  //gulp.start(['open']);
});
