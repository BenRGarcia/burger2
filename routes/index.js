// Require dependencies
const express = require('express');
const models = require('../models');

// Middleware to return sorted array of burger objects
const getBurgers = (req, res, next) => {
  // Query database...
  models.Burger
    // ...for all burgers...
    .findAll({
      attributes: ['id', 'burger_name', 'is_devoured'],
      // ...and their associated customer names...
      include: [models.Customer],
      // ...and order alphabetically by burger name
      order: [
        ['burger_name', 'ASC']
      ]
    })
    // Compose array of burger objects
    .then(resp => {
      // Test if any burgers returned from DB
      if (resp.length > 0) {
        // Normalize DB data into usable array of objects
        let burgers = resp.map(burgerObj => {
          let b = burgerObj.dataValues;
          let burger = {
            id: b.id,
            burger_name: b.burger_name,
            is_devoured: b.is_devoured,
            customer_name: b.Customer.dataValues.customer_name
          };
          return burger;
        });
        // Attach array of burgers to request body
        req.body.burgers = burgers;
      }
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
    res.render('index', { burgers: req.body.burgers })
  });

// error handler (don't send stack trace unless in dev environment )
htmlRouter.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      error: (htmlRouter.get('env') === 'development') ? err : {}
    });
});

module.exports = htmlRouter;

