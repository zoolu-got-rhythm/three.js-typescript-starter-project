const { src, dest, watch, series } = require('gulp');
var ts = require('gulp-typescript');
const { exec } = require('child_process');
const gulpEsbuild = require('gulp-esbuild')

// const gulpEsbuild = createGulpEsbuild({
// 	incremental: true, // enables the esbuild's incremental build
// 	piping: true,      // enables piping
// })

function transpileTask() {
    return src('src/**/*.ts')
    .pipe(gulpEsbuild({
        outfile: 'output.js',
        bundle: true,
        loader: {
            '.tsx': 'tsx',
        },
    }))
    // .pipe(ts({
    //     noImplicitAny: false,
    //     module: "amd",   
    //     outFile: 'output.js'
    // }))
    .pipe(dest('build/'));
}

function bundleTask() {
    console.log('\x1b[33m%s\x1b[0m', 'Updated output.js')
    return exec("npx webpack");
}

exports.default = function() {
    // composed task
    watch('src/**/*.ts', { ignoreInitial: false }, series(transpileTask, bundleTask));
};