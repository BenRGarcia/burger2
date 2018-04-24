// Database dependency
const mysql = require('mysql');
// Establish connection to database
const connection = require('./connection.js');

// Function that actually executes DB query
const executeQuery = (query, params = null) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, res, fields) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const orm = {
  // Get all burgers from database (READ)
  selectAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM burgers';
      executeQuery(query)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // Add new burger to database (CREATE)
  insertOne: ({ burger_name }) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO burgers SET ?';
      const params = { burger_name };
      executeQuery(query, params)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // Change burger 'devoured' 0 -> 1 (UPDATE)
  updateOne: ({ burger_name }) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE burgers SET ? WHERE ?';
      const params = [{ devoured: true },{ burger_name }];
      executeQuery(query, params)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // Delete all burgers from the database (DELETE)
  deleteAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'TRUNCATE TABLE burgers';
      executeQuery(query)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};

module.exports = orm;
