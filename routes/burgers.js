// Require dependencies
const express = require('express');
const models = require('../models');

// Create router
const apiRouter = express.Router();

// Define methods for PATH '/api/burgers'
apiRouter.route('/')

  // Create new burger (and customer if not already in DB)
  .post((req, res, next) => {
    // First create new customer
    models.Customer.findOrCreate({
      where: {
        customer_name: req.body.customer_name
      }
    })
      .spread((user, created) => {
        console.log(user.get({plain: true}).id);
        res.status(201).send();
      })
      .then()
      .catch(err => console.error(err));
      /* .then(resp => {

      }); */
    // Then create burger
    /* models.Burger.create({
      burger_name: req.body.burger_name
    }); */
  })

  // Update burger to 'devoured: true'
  .put((req, res, next) => {

  })

  // Delete all burgers and customers
  .delete((req, res, next) => {

  });

module.exports = apiRouter;
