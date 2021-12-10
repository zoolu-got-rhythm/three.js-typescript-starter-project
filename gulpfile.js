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
    notify: false,
    injectChanges: true,
  });
};

const transpileAndBundleTask = () =>
  src("src/**/*.ts")
    .pipe(
      gulpEsbuild({
        outdir: "bundle",
        bundle: true,
        minify: false,
      })
    )
    .pipe(dest("./"))
    .pipe(browserSync.reload({ stream: true }));
