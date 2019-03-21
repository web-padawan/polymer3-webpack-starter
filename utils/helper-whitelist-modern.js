/*
 * This file is similar to the helper-whitelist.js file, but only includes the polyfills/transforms necessary for
 * browsers that can load ES6 modules. The babel-helpers-modern.min.js file that is generated from this list is included
 * for all browsers. Therefore helpers included here do not need to be included in helper-whitelist.js.
 */
const modernHelpers = [
  // For Safari 12 bug: https://bugs.webkit.org/show_bug.cgi?id=190756
  // es2015 template-literals
  'taggedTemplateLiteral'
];

module.exports = [...modernHelpers];
