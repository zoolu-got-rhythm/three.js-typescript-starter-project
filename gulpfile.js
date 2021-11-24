const { src, dest, watch, series } = require('gulp');
var ts = require('gulp-typescript');
const gulpEsbuild = require('gulp-esbuild')

function transpileAndBundleTask() {
    return src('src/**/*.ts')
    .pipe(gulpEsbuild({
        outfile: 'bundle.js',
        bundle: true,
        // loader: {
            // '.tsx': 'tsx',
        // },
        minify: true
    }))
    .pipe(dest('dist/'));
}

exports.default = function() {
    watch('src/**/*.ts', { ignoreInitial: false }, transpileAndBundleTask);
};