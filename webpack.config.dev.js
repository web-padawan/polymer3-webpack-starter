'use strict';

const { resolve, join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_PATH = resolve('src');
const POLYFILL_PATH = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${POLYFILL_PATH}/webcomponents-*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${POLYFILL_PATH}/bundles/*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor', 'bundles'),
    flatten: true
  },
  {
    from: resolve(`${POLYFILL_PATH}/custom-elements-es5-adapter.js`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }
];

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: OUTPUT_PATH,
    filename: '[name].[chunkhash:8].js'
  },
  devtool: 'cheap-module-source-map',
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
                    targets: {
                      ie: 11
                    }
                  }
                ]
              ],
              plugins: [
                // Adds syntax support for import()
                require('@babel/plugin-syntax-dynamic-import').default,

                // Transforms async/await to promises
                [
                  require('fast-async'),
                  {
                    spec: true
                  }
                ],

                // Use Babel helpers from separate file
                [
                  require('@babel/plugin-external-helpers').default,
                  {
                    whitelist: require('./utils/helper-whitelist')
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(polyfills),
    new HtmlWebpackPlugin({
      template: resolve('./src/index.html')
    })
  ],
  devServer: {
    contentBase: OUTPUT_PATH,
    compress: true,
    overlay: true,
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
};
