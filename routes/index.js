// Require dependencies
const express = require('express');
const models = require('../models');

// Middleware to return array of burger objects
const getBurgers = (req, res, next) => {
  // Query database for all burgers and associated customer name

  // Compose array of burger objects

  // Attach array to req body

  // Call next middleware in stack

  // Catch and handle errors
};

// Create routers
const htmlRouter = express.Router();

// Define methods for PATH '/'
htmlRouter.route('/')
  .get(getBurgers, (req, res, next) => {
    res.send('index', req.body.burgers)
  });

// Wildcard redirect
router.get('*', (req, res, next) => {
  res.redirect(301, '/');
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

module.exports = htmlRouter;
