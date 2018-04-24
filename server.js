// Require dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const models = require('./models');

// Env variables
require('dotenv').config()

// Instantiate server
const app = express();

// Instantiate ExpressHandlebars to expose full API (Partials functionality)
const hbs = exphbs.create({ defaultLayout: 'main'});

// Mount middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define location of static assets
app.use(express.static(path.join(__dirname, 'public')))

// Register handlebars engine with app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define port
const PORT = process.env.PORT || 8080;

// HTML Router
const htmlRouter = require('./routes/index.js');
app.use('/', htmlRouter);

// API Router
const apiRouter = require('./routes/burgers.js');
app.use('/api/burgers', apiRouter);

// Catch 404, forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler (don't send stack trace unless in dev environment )
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    });
});

// Initialize database
models.sequelize.sync()
  // Start server
  .then(() => app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`)));
