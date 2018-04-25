module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1,64],
        is: /[\w ]/g  // A-Z, a-z, 0-9, or a space
      }
    },
    is_devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, { 
    timestamps: false,
    underscored: true
  });

  // Define association
  Burger.associate = models => {
    models.Burger.belongsTo(models.Customer);
  };

  // Return Burgers object
  return Burger;
};
