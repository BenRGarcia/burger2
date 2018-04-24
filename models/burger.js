module.exports = (sequelize, DataTypes) => {
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
    }
  }, { 
    timestamps: false 
  }
)};
