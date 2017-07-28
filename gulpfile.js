var gulp = require('gulp');
var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var tsProject = ts.createProject("tsconfig.json" , { declaration: true }  );

var tslintFunction = function () {
  var program = tslint.Linter.createProgram("./tsconfig.json");
  gulp.src('src/**/*.ts')
    .pipe(gulpTslint({ program }))
    .pipe(gulpTslint.report({ emitError: false }));
};
var buildFunction = function () {
  var tsStream = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
  return merge([
    tsStream.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist")),
    tsStream.dts.pipe(gulp.dest('./dist/'))])
};

gulp.task('tslint',tslintFunction);
gulp.task("build", buildFunction);
gulp.task('watch-tslint',function () {gulp.watch('src/**/*.ts', ['tslint']);});