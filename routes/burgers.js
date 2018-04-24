// Require dependencies
const express = require('express');
const models = require('../models');

// Create router
const apiRouter = express.Router();

// Define methods for PATH '/api/burgers'
apiRouter.route('/')

  // Create new burger (and customer if not already in DB)
  .post((req, res, next) => {

  })

  // Update burger to 'devoured: true'
  .put((req, res, next) => {

  })

  // Delete all burgers and customers
  .delete((req, res, next) => {

  });

module.exports = apiRouter;
