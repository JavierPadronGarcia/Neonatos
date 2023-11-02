module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("group", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })

  return Group;
}