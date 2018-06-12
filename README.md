# Polymer 3 Webpack Sandbox

This is an example project demonstrating how you can build a modern JavaScript application
using [Vaadin components](https://vaadin.com/components) and [Vaadin.Router](https://github.com/vaadin/vaadin-router) library.

The application uses ES modules for development, and [Webpack](https://webpack.js.org) as
a module bundler. The optimizations like code splitting, minifying JavaScript and HTML
(inside of the template string literals) are applied to reduce production bundle size.

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

Run the production build:

```sh
npm run build
```

Serve the built output on localhost `http://127.0.0.1:8000`:

```sh
npm start
```
