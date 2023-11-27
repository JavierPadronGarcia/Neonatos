module.exports = (sequelize, Sequelize) => {
  const WorkUnitGroup = sequelize.define("workUnitGroup", {
    GroupID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    WorkUnitID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    visibility: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
  return WorkUnitGroup;
}