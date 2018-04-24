module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,64],
        isAlpha: true
      }
    },
  }, {
      timestamps: false,
      underscored: true
    }
  );

  // Define Association
  Customer.associate = models => {
    models.Customer.hasMany(models.Burger)
  };

  // Return Customers object
  return Customer;
};
