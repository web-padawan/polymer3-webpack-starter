'use strict';

const { resolve, join } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { InjectManifest } = require('workbox-webpack-plugin');
const ModernModePlugin = require('./webpack/modern-mode-plugin');

const shouldAnalyze = process.argv.find(arg => arg.includes('--analyze'));
const OUTPUT_PATH = resolve('dist');
const INDEX_TEMPLATE = resolve('./src/index.html');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor', 'bundles'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }
];

const helpers = [
  {
    from: resolve('./src/vendor/babel-helpers.min.js'),
    to: join(OUTPUT_PATH, 'vendor')
  }
];

const assets = [
  {
    from: resolve('./src/assets'),
    to: join(OUTPUT_PATH, 'assets')
  },
  {
    from: resolve('./src/favicon.ico'),
    to: OUTPUT_PATH
  },
  {
    from: resolve('./src/api/employees.json'),
    to: join(OUTPUT_PATH, 'api')
  },
  {
    from: resolve('./src/manifest.json'),
    to: OUTPUT_PATH
  }
];

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
function createWebpackConfig({ modern = false } = {}) {
  return {
    name: modern ? 'modern' : 'legacy',
    mode: 'production',
    // Don't attempt to continue if there are any errors.
    bail: true,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: 'source-map',
    // The same entrypoint as used for development.
    entry: './src/index.js',
    output: {
      // The build folder.
      path: OUTPUT_PATH,
      // Generated JS file names.
      filename: modern
        ? 'static/js/[name].[chunkhash:8].m.js'
        : 'static/js/[name].[chunkhash:8].js'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: modern ? 8 : 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false
            },
            mangle: {
              safari10: true,
              // In ES6 modules toplevel scope is not the global scope.
              module: modern
            },
            output: {
              ecma: modern ? 8 : 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            },
            // Set to true for ES6
            module: modern
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: true
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // We need to transpile Polymer,so whitelist packages containing ES modules
          exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@vaadin)\/).*/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                cacheDirectory: true,
                presets: [
                  [
                    require('@babel/preset-env').default,
                    {
                      // Do not transform modules to CommonJS
                      modules: false,

                      // Do not transform async/await to generators.
                      exclude: [
                        'transform-async-to-generator',
                        'transform-regenerator'
                      ],

                      // Supported browsers
                      targets: modern ? { esmodules: true } : { ie: 11 }
                    }
                  ]
                ],
                plugins: [
                  // Adds syntax support for import()
                  require('@babel/plugin-syntax-dynamic-import').default,

                  // Transforms async/await to promises
                  !modern && [
                    require('fast-async'),
                    {
                      spec: true
                    }
                  ],

                  // Uses Babel helpers from separate file
                  !modern && [
                    require('@babel/plugin-external-helpers').default,
                    {
                      whitelist: require('./utils/helper-whitelist')
                    }
                  ],

                  // Passes HTML in `html` tagged template literal to `html-minifier`
                  [
                    require('babel-plugin-template-html-minifier'),
                    {
                      modules: {
                        '@polymer/polymer/lib/utils/html-tag.js': ['html']
                      },
                      htmlMinifier: {
                        collapseWhitespace: true,
                        minifyCSS: true,
                        removeComments: true
                      }
                    }
                  ]
                ].filter(Boolean)
              }
            },
            {
              loader: 'uglify-template-string-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      modern && new CleanWebpackPlugin([OUTPUT_PATH]),
      modern && new CopyWebpackPlugin([...polyfills, ...helpers, ...assets]),
      new HtmlWebpackPlugin({
        template: INDEX_TEMPLATE,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        }
      }),
      new ModernModePlugin({ modern }),
      new InjectManifest({
        swSrc: resolve('src', 'service-worker.js'),
        swDest: resolve(OUTPUT_PATH, 'sw.js'),
        exclude: [/webcomponents-(?!loader).*\.js$/]
      }),
      new CompressionPlugin({ test: /\.js(\.map)?$/i }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js(\.map)?$/i,
        threshold: 20,
        minRatio: 0.8,
        mode: 1
      }),
      modern && shouldAnalyze && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  };
}

module.exports = [createWebpackConfig({ modern: true }), createWebpackConfig()];
