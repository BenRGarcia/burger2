module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      notNull: true,
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

  // Return Customers object
  return Customer;
};
