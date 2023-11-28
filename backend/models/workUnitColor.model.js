module.exports = (sequelize, Sequelize) => {
  const WorkUnitColor = sequelize.define("workUnitColor", {
    WorkUnitId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ColorId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    visibility: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
  return WorkUnitColor;
}