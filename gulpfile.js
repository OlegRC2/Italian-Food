"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

const dist = "./dist";
// const dist = "C:/openserver/domains/Test3";

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
    return gulp.src("./src/sass/style.scss")
                .pipe(sass().on('error', sass.logError))
                .pipe(rename({suffix: '.min', prefix: ''}))
                .pipe(gulp.dest(dist + "/css"))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/script.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		server: dist + "/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./src/sass/**/*.+(scss|sass|css)", gulp.parallel("build-sass"));
});

gulp.task("fonts", () => {
    return gulp.src("./src/fonts/**/*")
        .pipe(gulp.dest(dist + "/fonts"));
});

gulp.task("icons", () => {
    return gulp.src("./src/icons/**/*")
        .pipe(gulp.dest(dist + "/icons"));
});

gulp.task("images", () => {
    return gulp.src("./src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest(dist + "/img"));
});

gulp.task("js", () => {
  return gulp.src("./src/js/lib/*")
      .pipe(gulp.dest(dist + "/js/lib"));
});

gulp.task("php", () => {
  return gulp.src("./src/*.php")
      .pipe(gulp.dest(dist));
});

gulp.task("build", gulp.parallel("copy-html", "build-js", "build-sass", "fonts", "icons", "images", "js", "php"));

gulp.task("prod", () => {
    gulp.src("./src/sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dist));

    return gulp.src("./src/js/script.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));