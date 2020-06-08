// Pull in Laravel Mix
var mix = require("laravel-mix");

if (!mix.inProduction()) {
  // Configure what it does
  mix.copyDirectory("static", "public");

  mix
    // This is required for hot reloading
    .setPublicPath("./public")
    .webpackConfig({
      module: {
        rules: [
          // ⬇️ Add this:
          {
            test: /\.worker\.js$/,
            use: { loader: "worker-loader" },
          },
        ],
      },
      // ...
      output: {
        // ...
        globalObject: "this", // ⬅️ And this
      },
      target: "node",
    })
    // This will copy files from static folder
    // directly into dist folder
    .copy("src/start.js", "build/electron.js")
    // This will process our entry point (app.js)
    // into the dist/js folder
    .react("src/index.js", "public/js");
} else {
  // Configure what it does
  mix.copyDirectory("static", "build");
  mix
    // This is required for hot reloading
    .setPublicPath("./build")
    .webpackConfig({
      module: {
        rules: [
          // ⬇️ Add this:
          {
            test: /\.worker\.js$/,
            use: { loader: "worker-loader" },
          },
        ],
      },
      // ...
      output: {
        // ...
        globalObject: "this", // ⬅️ And this
      },
      target: "node",
    })
    // This will copy files from static folder
    // directly into dist folder
    .copy("src/start.js", "build/electron.js")
    // This will process our entry point (app.js)
    // into the dist/js folder
    .react("src/index.js", "build/js");
}
