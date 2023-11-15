module.exports = (sequelize, Sequelize) => {
  const TeacherCourse = sequelize.define("TeacherCourse", {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    GroupID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    }
  })
  return TeacherCourse;
}