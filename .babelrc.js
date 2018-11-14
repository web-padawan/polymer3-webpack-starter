const helperWhitelist = require('./utils/helper-whitelist');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        targets: {
          ie: 11
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/external-helpers',
      {
        whitelist: helperWhitelist
      }
    ],
    '@babel/syntax-dynamic-import',
    '@babel/syntax-object-rest-spread',
    [
      'module:fast-async',
      {
        spec: true
      }
    ]
  ],
  env: {
    production: {
      plugins: [
        [
          'template-html-minifier',
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
      ]
    }
  }
};
