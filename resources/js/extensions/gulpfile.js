const { src, dest, watch } = require("gulp");
const javascriptObfuscator = require("gulp-javascript-obfuscator");
const minifyJs = require("gulp-uglify");
const minifyCss = require("gulp-clean-css");
const sourceMap = require("gulp-sourcemaps");
const concat = require("gulp-concat");

const bundleJs = () => {
    return src("./src/js/**/*.js")
        .pipe(sourceMap.init())
        .pipe(minifyJs())
        .pipe(concat("main.min.js"))
        .pipe(sourceMap.write())
        .pipe(dest("./dist/js"));
};
const bundleCss = () => {
    return (
        src("./src/css/**/*.css")
            .pipe(sourceMap.init())
            // .pipe(javascriptObfuscator({ compact: true }))
            .pipe(minifyCss())
            .pipe(concat("main.min.css"))
            .pipe(sourceMap.write())
            .pipe(dest("./dist/css"))
    );
};

const devWatch = () => {
    watch("./src/js/**/*.js", bundleJs);
    watch("./src/css/**/*.css", bundleCss);
};

exports.bundleJs = bundleJs;
exports.bundleCss = bundleCss;
exports.devWatch = devWatch;
