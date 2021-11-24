const { src, dest, watch, series } = require('gulp');
var ts = require('gulp-typescript');
const { exec } = require('child_process');

function transpileTask() {
    return src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: false,
        module: "amd",   
        outFile: 'output.js'
    }))
    .pipe(dest('build/'));
}

function bundleTask() {
    return exec("npx webpack");
}

exports.default = function() {
    // composed task
    watch('src/**/*.ts', { ignoreInitial: false }, series(transpileTask, bundleTask));
};