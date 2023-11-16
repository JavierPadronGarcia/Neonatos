module.exports = (sequelize, Sequelize) => {
  const Grade = sequelize.define("grade", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ItemID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ExerciseID: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
  return Grade;
}