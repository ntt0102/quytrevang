const { src, dest, watch } = require("gulp");
const javascriptObfuscator = require("gulp-javascript-obfuscator");
const minifyCss = require("gulp-clean-css");
const sourceMap = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const headerComment = require("gulp-header-comment");
const sass = require("gulp-sass")(require("sass"));

const bundleJs = () => {
    return (
        src("./src/js/**/*.js")
            .pipe(sourceMap.init())
            .pipe(concat("smart-order.min.js"))
            // .pipe(javascriptObfuscator({ compact: true }))
            // .pipe(
            //     headerComment(`
            //     <%= pkg.description %> v<%= pkg.version %>
            //     Author: <%= _.capitalize(pkg.author) %>
            //     <%= pkg.license %>
            // `)
            // )
            .pipe(sourceMap.write())
            .pipe(dest("./dist/js"))
    );
};
const bundleCss = () => {
    return (
        src("./src/sass/**/*.scss")
            .pipe(sourceMap.init())
            .pipe(concat("smart-order.min.css"))
            // .pipe(minifyCss())
            // .pipe(
            //     headerComment(`
            //         <%= pkg.description %> v<%= pkg.version %>
            //         Author: <%= _.capitalize(pkg.author) %>
            //         <%= pkg.license %>
            //     `)
            // )
            .pipe(sass().on("error", sass.logError))
            .pipe(sourceMap.write())
            .pipe(dest("./dist/css"))
    );
};

const devWatch = () => {
    watch("./src/js/**/*.js", bundleJs);
    watch("./src/sass/**/*.scss", bundleCss);
};

exports.bundleJs = bundleJs;
exports.bundleCss = bundleCss;
exports.devWatch = devWatch;
