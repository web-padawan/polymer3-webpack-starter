const express = require('express');
const serveStatic = require('express-static-gzip');
const history = require('connect-history-api-fallback');
const port = process.env.PORT || 8000;

const app = express();

const users = require('./src/api/employees.json');
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.use(history());
app.use(
  serveStatic(__dirname + '/dist/', {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  })
);
app.listen(port);

console.info(`Project is running at http://localhost:${port}`);
