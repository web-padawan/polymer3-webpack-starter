const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();

app.use(history());
app.use(serveStatic(__dirname + '/dist/'));
app.listen(8000);

console.info('Project is running at http://localhost:8000');
