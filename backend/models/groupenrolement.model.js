module.exports = (sequelize, Sequelize) => {
  const GroupEnrolement = sequelize.define("groupEnrolement", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    GroupID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Date: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  })
  return GroupEnrolement;
}