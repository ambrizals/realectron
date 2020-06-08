// Pull in Laravel Mix
var mix = require('laravel-mix')

// Configure what it does
mix
  // This is required for hot reloading
  .setPublicPath('./public')
  .webpackConfig({
    module: {
      rules: [
        // ⬇️ Add this:
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    },
    // ...
    output: {
      // ...
      globalObject: 'this', // ⬅️ And this
    },
    target: 'node'
  })
  // This will copy files from static folder
  // directly into dist folder
  .copy('src/static', 'dist')
  // This will process our entry point (app.js)
  // into the dist/js folder
  .react('src/index.js', 'public/js');