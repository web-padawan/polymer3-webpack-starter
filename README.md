# Polymer 3 Webpack Sandbox

### Prerequisites

1. Install dependencies

```sh
npm i
```

2. Outside this folder: clone `vaadin-router` repo locally

```sh
git clone https://github.com/vaadin-router/vaadin-router && cd vaadin-router && npm link
```

3. Inside of this folder: link `@vaadin/router`

```sh
npm link @vaadin/router
```

### Start the development server

Start the `webpack-dev-server` on localhost `http://localhost:3000`.

```sh
npm run dev
```

### Build

Run the production build with minification:

```sh
npm run build
```

Serve the built output:

```sh
npm start
```
