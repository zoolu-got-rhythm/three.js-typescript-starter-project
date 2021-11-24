const { src, dest, watch } = require("gulp");
const gulpEsbuild = require("gulp-esbuild");
const browserSync = require("browser-sync");

exports.default = () => {
  initBrowserSync();
  watch("src/**/*.ts", { ignoreInitial: false }, transpileAndBundleTask);
};

const initBrowserSync = () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "src/index.html",
    },
    notify: true,
    injectChanges: true,
  });
};

const transpileAndBundleTask = () =>
  src("src/**/*.ts")
    .pipe(
      gulpEsbuild({
        outfile: "bundle.js",
        bundle: true,
        minify: false,
      })
    )
    .pipe(dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
