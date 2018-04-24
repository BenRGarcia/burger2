const orm = require('../config/orm.js');

const burger = {
  getAllBurgers: () => {
    return new Promise((resolve, reject) => {
      orm.selectAll()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  addNewBurger: burger => {
    return new Promise((resolve, reject) => {
      orm.insertOne(burger)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  eatBurger: burger => {
    return new Promise((resolve, reject) => {
      orm.updateOne(burger)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  deleteAllBurgers: () => {
    return new Promise((resolve, reject) => {
      orm.deleteAll()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};

module.exports = burger;
