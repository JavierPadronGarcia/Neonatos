module.exports = (sequelize, Sequelize) => {
  const Color = sequelize.define("color", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    primaryColor: {
      type: Sequelize.STRING,
      allowNull: false
    },
    secondaryColor: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
  return Color;
}