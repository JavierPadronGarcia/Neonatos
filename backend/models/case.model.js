module.exports = (sequelize, Sequelize) => {
  const Case = sequelize.define("case", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    WorkUnitId: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
  return Case;
}