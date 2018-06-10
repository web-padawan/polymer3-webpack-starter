'use strict';

const {resolve, join} = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const ENV = process.argv.find(arg => arg.includes('mode=production')) ? 'production' : 'development';
const IS_DEV_SERVER = process.argv.find(arg => arg.includes('webpack-dev-server'));
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('src') : resolve('dist');

const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};

/**
 * === Copy static files configuration
 */
const copyStatics = {
  copyWebcomponents: [{
    from: resolve('./node_modules/polymer-build/lib/babel-helpers-full.min.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/webcomponents-*.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/bundles/*.js'),
    to: join(OUTPUT_PATH, 'vendor', 'bundles'),
    flatten: true
  }, {
    from: resolve('./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }],
  copyOthers: [{
    from: resolve('./src/favicon.ico'),
    to: OUTPUT_PATH,
    flatten: true
  }, {
    from: resolve('./src/employees.json'),
    to: OUTPUT_PATH,
    flatten: true
  }]
};

/**
 * Plugin configuration
 */
let plugins = IS_DEV_SERVER ? [] : [new CleanWebpackPlugin([OUTPUT_PATH], {verbose: true})];

plugins = plugins.concat([IS_DEV_SERVER ?
  new CopyWebpackPlugin(copyStatics.copyWebcomponents) :
  new CopyWebpackPlugin(
    [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  )
]).concat([
  new webpack.DefinePlugin({'process.env': processEnv}),
  new HtmlWebpackPlugin({
    template: resolve('./src/index.html')
  })
]);

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    path: OUTPUT_PATH,
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        // We need to transpile Polymer, do not exclude node_modules
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              require('@babel/plugin-external-helpers'),
              require('@babel/plugin-syntax-dynamic-import'),
              require('@babel/plugin-transform-classes'),
              require('@babel/plugin-syntax-object-rest-spread'),
              require('@babel/plugin-transform-arrow-functions'),
              require('@babel/plugin-transform-async-to-generator'),
              require('@babel/plugin-transform-block-scoped-functions'),
              require('@babel/plugin-transform-block-scoping'),
              require('@babel/plugin-transform-computed-properties'),
              require('@babel/plugin-transform-destructuring'),
              require('@babel/plugin-transform-duplicate-keys'),
              require('@babel/plugin-transform-exponentiation-operator'),
              require('@babel/plugin-transform-for-of'),
              require('@babel/plugin-transform-function-name'),
              require('@babel/plugin-transform-instanceof'),
              require('@babel/plugin-transform-literals'),
              require('@babel/plugin-transform-modules-amd'),
              require('@babel/plugin-transform-object-super'),
              require('@babel/plugin-transform-parameters'),
              require('@babel/plugin-transform-regenerator'),
              require('@babel/plugin-transform-shorthand-properties'),
              require('@babel/plugin-transform-spread'),
              require('@babel/plugin-transform-sticky-regex'),
              require('@babel/plugin-transform-template-literals'),
              require('@babel/plugin-transform-typeof-symbol')
            ]
          }
        }
      }
    ]
  },
  plugins,
  devServer: {
    contentBase: OUTPUT_PATH,
    compress: true,
    overlay: {
      errors: true
    },
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true
  }
};

