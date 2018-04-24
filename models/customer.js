module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Customers = sequelize.define("Customers", {
    customer_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
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
    models.Customers.hasMany(models.Burgers)
  };
  
  // Return Customers object
  return Customers;
};
