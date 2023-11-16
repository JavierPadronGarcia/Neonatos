module.exports = app => {
  const teachercourse = require("../controllers/teachercourse.controller")

  var router = require("express").Router();

  // assign teachers to groups or groups to teachers
  router.post("/", teachercourse.create);

  // retrieve all data from teachercourse
  router.get("/", teachercourse.findAll);

  //retrieve all teachers in a group
  router.get("/group/:id", teachercourse.findAllTeacherInCourse);

  //retrieve the count of the teachers in a group
  router.get("/teachercount/group/:id", teachercourse.getCountOfTeachersInCourse);

  //update
  router.put("/:userId/:groupId", teachercourse.update);

  //delete
  router.delete("/:userId/:groupId", teachercourse.remove);

  app.use('/api/teachercourse', router);
}