module.exports = app => {
  const teachercourse = require("../controllers/teachercourse.controller")
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  // assign teachers to groups or groups to teachers
  router.post("/", auth.isAuthenticated, teachercourse.create);

  // retrieve all data from teachercourse
  router.get("/", auth.isAuthenticated, teachercourse.findAll);


  //retrieve all teachers in a group
  router.get("/group/:id", auth.isAuthenticated, teachercourse.findAllTeacherInCourse);

  //retrieve the count of the teachers in a group
  router.get("/teachercount/group/:id", auth.isAuthenticated, teachercourse.getCountOfTeachersInCourse);

  //retrieve all teachers ordered by group desc
  router.get("/orderdesc", auth.isAuthenticated, teachercourse.findAllOrderedByGroupDesc);

  //retrieve all teachers not in this table
  router.get("/teachernotinagroup", auth.isAuthenticated, teachercourse.findAllTeachersNotInAGroup);

  //retrieve all teachers not in this table
  router.get("/allGroupsAssignedToTeacher/:id", auth.isAuthenticated, teachercourse.findAllGroupsByTeacher);

  //update the teacherCourse table with the userId and groupId
  router.put("/:userId/:groupId", auth.isAuthenticated, teachercourse.update);

  //delete the teacherCourse data with the userId and groupId
  router.delete("/:userId/:groupId", auth.isAuthenticated, teachercourse.remove);

  app.use('/api/teachercourse', router);
}