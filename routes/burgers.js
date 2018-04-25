// Require dependencies
const express = require('express');
const models = require('../models');

// Create router
const apiRouter = express.Router();

// Define methods for PATH '/api/burgers'
apiRouter.route('/')

  // Create new burger (and customer if not yet in DB)
  .post((req, res, next) => {
    // Parse out data from request body
    const customer_name = req.body.customer_name;
    const burger_name = req.body.burger_name;
    // Create new burger with association to customer id
    models.Burger.create({
        burger_name,
        Customer: { customer_name }
      },{
        include: [{
          association: models.Burger.belongsTo(models.Customer)
        }]
      })
      // Send response to client
      .then(() => res.status(201).send())
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  })

  // Update burger to 'devoured: true'
  .put((req, res, next) => {
    // Parse out data from request body
    const id = req.body.id;
    // Define data to update
    const is_devoured = true;
    // Query DB to update data
    models.Burger.update({ is_devoured },{
      where: { id }
    })
      // Send response to client
      .then(() => res.status(204).send())
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  })

  // Delete all burgers and customers
  .delete((req, res, next) => {
    // Delete Burger table
    models.Burger.destroy({ where: {} })
      .then(() => {
        // Delete Customer table
        return models.Customer.destroy({ where: {} })
      })
      // Send response to client
      .then(() => res.status(204).send())
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  });

module.exports = apiRouter;
