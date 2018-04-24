module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1,64],
        isAlpha: true
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
