var gulp = require('gulp');
var js = require("gulp-uglify");
var minify = require('gulp-clean-css');
var less = require("gulp-less");
var htmlmin = require('gulp-htmlmin');
var path = require('path');
var cssBase64 = require('gulp-base64');
var del = require('del');
var css = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var rev = require('gulp-rev'); //- 对文件名加MD5后缀  
var revCollector = require('gulp-rev-collector');  //- 路径替换  
var rename = require('gulp-rename');//- 文件重名
var runSequence = require('run-sequence'); //- 执行顺序

// 删除文件
gulp.task('clean', function(cb) {
    del(['./dist','./rev'],cb)
});

//压缩js
gulp.task('js', function () {
    gulp.src('public/js/**/*.js') // 要压缩的js文件
    .pipe(js())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});
//编译并压缩less
gulp.task('less', function () {
    return gulp.src('public/style/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssBase64())
        .pipe(minify())
        .pipe(gulp.dest('dist/style/'));
});

//压缩css
gulp.task('css',function () {
    return gulp.src('public/style/**/*.css')
        .pipe(css({compatibility: 'ie6'}))
        .pipe(minify())
        .pipe(gulp.dest('dist/style/'));
})

//样式工具
gulp.task('ctool',function () {
    return gulp.src('public/style/ctool/**/*')
        .pipe(gulp.dest('dist/style/ctool'));
})

//公用less
gulp.task('cshare',function () {
    return gulp.src('public/style/share/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssBase64())
        .pipe(minify())
        .pipe(gulp.dest('dist/style/share/'));
})

//压缩图片
gulp.task('img',function () {
   return gulp.src('public/images/**/*.{jpg,png,gif,ico}')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images/'))
})

//字体
gulp.task('font', function () {
    return gulp.src('public/style/font/**/*')
        .pipe(gulp.dest('dist/style/font/'));
});

// 压缩ejs
gulp.task('ejs', function() {
  return gulp.src('views/**/*.ejs')
   .pipe(htmlmin({collapseWhitespace: true}))
   .pipe(gulp.dest('dist/views/'));
});

// // 引用文件
// gulp.task('tool', function () {
//     return gulp.src('public/tool/**/*')
//         .pipe(gulp.dest('dist/tool/'));
// });


//监听
gulp.task('build',['less','css','ctool','cshare','js','img','font','ejs'],function(){
	gulp.watch('public/style/**/*',['less']);
	gulp.watch('public/style/**/*',['css']);
	gulp.watch('public/tool/**/*',['ctool']);
	gulp.watch('public/style/share/**/*',['cshare']);
	gulp.watch('public/js/**/*',['js']);
	gulp.watch('public/images/**/*',['img']);
	gulp.watch('public/font/**/*',['font']);
	gulp.watch('views/**/**/*',['ejs']);
})

gulp.task('default',['build']);


/**
 * 打包时 压缩并且js css文件名添加md5后缀防止缓存
 *   运行步骤： 1、 gulp clean
 *             2、 gulp zip
 */

// 压缩less/css
gulp.task('revLess', function () {
    return gulp.src(['public/style/**/*.less','public/style/**/*.css'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rename(function (path){
          path.extname = '.css'
        }))
        .pipe(rev())
        .pipe(cssBase64())
        .pipe(minify())
        .pipe(gulp.dest('dist/style/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

// 压缩js
gulp.task('revJs', function () {
    return gulp.src('public/js/**/*.js')
        .pipe(rename(function (path){
        path.extname = '.js'
        }))
        .pipe(rev())
        .pipe(js())
        .pipe(gulp.dest('dist/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

// 压缩ejs
gulp.task('revEjs',function () {
    return gulp.src(['./rev/**/*.json','./views/**/*.ejs'])
        .pipe(revCollector({
        replaceReved: true
        }))
        .pipe(gulp.dest('dist/views/'))
});

gulp.task('zip',function (done) {
    runSequence(
        ['img'],
        ['ctool'],
        ['font'],
        ['revLess'],
        ['revJs'],
        ['revEjs'],
        done)
})