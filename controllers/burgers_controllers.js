// Require dependency
const express = require('express');
const burger = require('../models/burger.js');

// Input validation for POST/PUT requests
const isValid = (req, res, next) => {
  // For define variable for expected 'burger' object
  const burger = req.body;
  // Test for presence of 'burger_name' prop
  if (!burger.hasOwnProperty('burger_name')) {
    const error = new Error(`${req.method} request received missing required property 'burger_name'`);
    error.status = 400;
    next(error)
  }
  // Test for having one and only one prop
  if (Object.keys(burger).length !== 1) {
    const error = new Error(`${req.method} request received has more properties than are allowed`);
    error.status = 400;
    next(error)
  }
  // Test for prop value of correct primitive data type
  if (typeof burger.burger_name !== 'string') {
    const error = new Error(`${req.method} request received has incorrect primitive data type, should be 'string'`);
    error.status = 400;
    next(error)
  }
  // Data is valid, send to next middleware in stack
  next();
};

// Create router
const router = express.Router();

// Define methods for PATH '/'
router.route('/')
  .get((req, res, next) => {
      // Retrieve all burgers
      burger.getAllBurgers()
        // Render burgers to response
        .then(burgers => {
          res.render('index', { burgers });
        })
        // Error handling
        .catch(err => {
          // Server side error handling
          console.error(err)
          // Client side error handling
          const error = new Error('Internal server error, database could not be accessed.');
          error.status = 500;
          next(error);
        });
    });

// Define methods for PATH '/burgers'
router.route('/burgers')
  .post(isValid, (req, res, next) => {
    burger.addNewBurger(req.body)
      .then(r => res.status(201).send(req.body))
      .catch(err => console.error(err));
  })
  .put(isValid, (req, res, next) => {
    burger.eatBurger(req.body)
      .then(r => res.status(204).send())
      .catch(err => console.error(err));
  })
  .delete((req, res, next) => {
    burger.deleteAllBurgers()
      .then(r => res.status(204).send())
      .catch(err => console.error(err));
  });

// Wildcard redirect
router.get('*', (req, res, next) => {
  res.redirect(301, '/');
});

// Client-Side Error handling
router.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.message || `Internal server error.`;
  res.status(status).send({ error: msg });
});

module.exports = router;
