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
    },
    devoured_by_id: {
      type: DataTypes.INTEGER,
      validate: {
        allowNull: true,
        defaultValue: null,
      }
    }
  }, { 
    timestamps: false 
  }
)};
