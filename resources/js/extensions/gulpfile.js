const { src, dest, watch } = require("gulp");
const minifyJs = require("gulp-uglify");
const minifyCss = require("gulp-clean-css");
const sourceMap = require("gulp-sourcemaps");
// const convertEncoding = require("gulp-convert-encoding");
// const utf8Convert = require("gulp-utf8-convert");
const concat = require("gulp-concat");

const bundleJs = () => {
    return (
        src("./src/js/**/*.js")
            .pipe(sourceMap.init())
            .pipe(minifyJs())
            .pipe(concat("main.js"))
            .pipe(sourceMap.write())
            // .pipe(convertEncoding({ from: "iso-8859-1", to: "utf8" }))
            .pipe(dest("./dist/js"))
    );
};
const bundleCss = () => {
    return (
        src("./src/css/**/*.css")
            .pipe(sourceMap.init())
            .pipe(minifyCss())
            .pipe(concat("main.css"))
            .pipe(sourceMap.write())
            // .pipe(convertEncoding({ from: "windows1250", to: "utf8" }))
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
