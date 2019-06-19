[![Known Vulnerabilities](https://snyk.io/test/github/web-padawan/polymer3-webpack-starter/badge.svg)](https://snyk.io/test/github/web-padawan/polymer3-webpack-starter)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Lighthouse score: 91/100](https://lighthouse-badge.appspot.com/?score=91&compact&category=PWA)](https://github.com/ebidel/lighthouse-badge)

# Polymer 3 Webpack Starter

This is an example project demonstrating how you can build a frontend part of the JavaScript
application using [Vaadin components](https://vaadin.com/components) and [Vaadin Router](https://github.com/vaadin/vaadin-router) library, and leverage the benefits of the modern tools.

[Lumo version ↗](https://polymer3-webpack-starter.herokuapp.com/)
|
[Material version ↗](https://polymer3-material-starter.herokuapp.com/)

## Features

- Latest Polymer 3 and up-to-date [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) polyfill
- UI built using latest [Vaadin components](https://vaadin.com/components) shipped as ES modules
- Application with two different themes: [Lumo](https://github.com/vaadin/vaadin-lumo-styles) and [Material](https://github.com/vaadin/vaadin-material-styles)
- [Vaadin Router](https://vaadin.com/router) configured for code splitting and lazy loading
- [webpack 4](https://github.com/webpack/webpack) for easy development and production bundling
- Up-to-date [Babel 7](https://github.com/babel/babel) verified to work nice with Custom Elements
- Modern build for evergreen browsers using [BabelMultiTargetPlugin](https://github.com/DanielSchaffer/webpack-babel-multi-target-plugin)
- Minification of JavaScript using [Terser](https://github.com/terser-js/terser) supporting ES2015+
- Minification of HTML and CSS in [tagged template literals](https://github.com/cfware/babel-plugin-template-html-minifier)
- Automatic service worker generation using [Workbox](https://github.com/GoogleChrome/workbox)
- Automatic [bundle analysis](https://github.com/webpack-contrib/webpack-bundle-analyzer) and report generation
- Web server using [express](https://github.com/expressjs/express) and [History API](https://github.com/bripkens/connect-history-api-fallback) middleware
- Compressing static files for production using [gzip](https://github.com/webpack-contrib/compression-webpack-plugin) and [Brotli](https://github.com/mynameiswhm/brotli-webpack-plugin) algorithm
- Serving compressed files using [express-static-gzip](https://github.com/tkoenig89/express-static-gzip) middleware

## Install dependencies

```sh
npm i
```

## Start the development server

Start `webpack-dev-server` on localhost `http://127.0.0.1:3000`:

```sh
npm run dev
```

## Lint JavaScript

```sh
npm run lint
```


## Build

Run production build:

```sh
npm run build
```

Serve the built output on localhost `http://127.0.0.1:8000`:

```sh
npm start
```

## Visualize build output

Run production build and start HTTP server to show bundle report:

```sh
npm run build:analyze
```

## Material version

Check out [material](https://github.com/web-padawan/polymer3-webpack-starter/tree/material) branch for [Material version](https://polymer3-material-starter.herokuapp.com/) of the starter, and a [full diff](https://github.com/web-padawan/polymer3-webpack-starter/compare/material) of changes.

## Known limitations

- Using `import.meta` suggested by Polymer docs is not supported out of the box, see [webpack/webpack#6719](https://github.com/webpack/webpack/issues/6719).
  Support can be added with [babel-plugin-bundled-import-meta](https://github.com/cfware/babel-plugin-bundled-import-meta) or
  webpack loader [import-meta-url-loader](https://github.com/open-wc/open-wc/blob/master/packages/webpack/loaders/import-meta-url-loader.js)
