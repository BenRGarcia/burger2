module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1,64],
        is: /[\w ]/g  // A-Z, a-z, 0-9, or a space
      }
    },
  }, {
      timestamps: false,
      underscored: true
    }
  );

  // Define association
  Customer.associate = models => {
    models.Customer.hasOne(models.Burger);
  };

  // Return Customers object
  return Customer;
};
