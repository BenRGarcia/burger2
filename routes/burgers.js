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
        Customer: {customer_name}
      },{
        include: [{
          association: models.Burger.belongsTo(models.Customer)
        }]
      })
      .then(() => res.status(201).send())
      .catch(err => console.error(err));
  })

  // Update burger to 'devoured: true'
  .put((req, res, next) => {
    const is_devoured = true;
    const id = req.body.id;
    models.Burger.update({is_devoured},{
      where: {id}
    })
      .then(() => res.status(204).send())
      .catch(err => console.error(err));
  })

  // Delete all burgers and customers
  .delete((req, res, next) => {
    
  });

module.exports = apiRouter;
