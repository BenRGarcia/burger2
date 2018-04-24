module.exports = (sequelize, DataTypes) => {
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
      timestamps: false
    }
  )
};
