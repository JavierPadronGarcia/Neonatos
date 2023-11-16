module.exports = (sequelize, Sequelize) => {
  const Exercise = sequelize.define("exercise", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assigned: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    CaseID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    UserID: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
  return Exercise;
}