const files = require.context(".", false, /\.js$/);
let modules = [];
files.keys().forEach(key => {
    if (key === "./index.js") return;
    modules = [...modules, ...files(key).default];
});

export default modules;
