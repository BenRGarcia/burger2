module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Burgers = sequelize.define("Burgers", {
    burger_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1,64],
        isAlpha: true
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, { 
    timestamps: false,
    underscored: true
  });

  // Define association
  Burgers.associate = models => {
    models.Burgers.belongsTo(models.Customers);
  };

  // Return Burgers object
  return burger;
};
