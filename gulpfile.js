/**
 * Created by Jne on 2017/6/23.
 */
/*less文件编译*/


/*以下是自动化流程======================================================================*/


/*引入包 npm install 名字*/
var gulp = require('gulp');
/*引入less包*/
var less = require('gulp-less');
/*压缩包导入cssnano不懂查文档*/
var cssnano = require('gulp-cssnano');
/*注册任务*/        /*任务执行的函数*/
gulp.task('style', function() {
    /*以下是链式编程不要加分号*/
    // 将你的默认的任务代码放在这
    /*这里执行style任务时候自动执行*/
    /*不用合并less文件可以用@imprt url 导入文件在合并合并没有意义 *号为通配符*/
   gulp.src(['src/styles/*.less','!src/styles/_*.less'])
       /*执行以下less函数开启编译*/
       .pipe(less())
       .pipe(cssnano())
       /*文件名字不用自己去写导入放到哪个目录下就可以了*/
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.reload({
           stream:true
       }))
});
/*创建合并变量合并插件*/
var concat = require('gulp-concat')
/*创建压缩变 混淆 量导入包*/
var uglify = require('gulp-uglify')



            /*js压缩 合并 混淆*/
/*创建一个压缩js的任务*/
gulp.task('script',function(){

    /*还是找文件引入*/
    gulp.src('src/scripts/*.js')
        /*js文件合并的时候名字不能自动生成自己随便可以写一个名字*/
        .pipe(concat('all.js'))
    /*然后合并完成应该导入目录下一步是导出目录*/
        .pipe(uglify())/*这句话混淆压缩*/
        /*目录名字随便写一个*/
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream:true
        }))

})

/*图片的复制 还是倒入包引入包创建任务*/

gulp.task('image',function(){

    /*还是找文件*/
    gulp.src('src/images/*.*')/*匹配所有图片文件ping*/
            /*要输出的目录在这个项目所在的地方*/
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }))
})

/*html的处理*/

var htmlmin = require('gulp-htmlmin');

gulp.task('html',function(){

    /*还是找文件*/
    gulp.src('src/*.html')/*匹配所有html 在根目录 ping*/
        /*去掉空白字符*/
        /*html有一些属性不明白的要自己查文档有去掉引号的有去掉注释的的有去掉文档开头的*/
        .pipe(htmlmin({collapseWhitespace: true,removeComments:true,removeAttributeQuotes:true}))

        /*要输出的目录在这个项目所在的地方*/
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }))
})


/*启动一个服务顺便监视一下文件的变化需要包*/
/*载入browsersync 这个包开启服务器*/
var browserSync = require('browser-sync');
gulp.task('serve',function(){
    browserSync({server: {
        /*在server这个里面添加配置文件参数就是服务器默认打开的目录*/
        baseDir:['dist']/*这就话就是默认设置那个目录在项目文件里面输出那个目录当前是dist*/
    }}, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
        /*添加监视任务*/
        gulp.watch('src/styles/*.less',['style'])
        gulp.watch('src/scripts/*.js',['script'])
        gulp.watch('src/images/*.*',['image'])
        gulp.watch('src/*.html',['html'])

    });
})/*这sever服务器启动过后就可以自动刷新了我们要添加一个监视来监视所有文件发生变化了，我们需要自动的编译*/
/*然后我们安装完成 使用 函数名 gulp html 启动调用 服务器 gulp serve*/ 