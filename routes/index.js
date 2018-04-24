// Require dependencies
const express = require('express');
const models = require('../models');

// Middleware to return sorted array of burger objects
const getBurgers = (req, res, next) => {
  // Query database...
  models.Burgers
    // ...for all burgers...
    .findAll({
      // ...and their associated customer names...
      include: [models.Customer],
      // ...and order alphabetically by burger name
      order: [
        ['burger_name', 'ASC']
      ]
    })
    // Compose array of burger objects
    .then(burgers => {
      // Debugging
      console.log(burgers);
      // Attach array of burgers to request body
      req.body.burgers = burgers;
      // Call next middleware in stack
      next();
    })
    // Catch and handle errors
    .catch(err => {
      console.error(err);
      next(err);
    });
};

// Create router
const htmlRouter = express.Router();

// Define methods for PATH '/'
htmlRouter.route('/')

  // User visits homepage
  .get(getBurgers, (req, res, next) => {
    res.send('index', req.body.burgers)
  });

// Wildcard redirect
htmlRouter.route('*', (req, res, next) => {
  res.redirect(301, '/');
});

// error handler (don't send stack trace unless in dev environment )
htmlRouter.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = htmlRouter;

