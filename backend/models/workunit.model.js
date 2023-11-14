module.exports = (sequelize, Sequelize) => {
  const WorkUnit = sequelize.define("workUnit", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })

  return WorkUnit;
}