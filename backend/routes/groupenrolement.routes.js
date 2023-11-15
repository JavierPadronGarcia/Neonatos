module.exports = app => {
  const groupEnrolement = require("../controllers/groupenrolement.controller")

  var router = require("express").Router();

  // assign students to groups or groups to students
  router.post("/", groupEnrolement.create);

  // retrieve all data from groupenrolements
  router.get("/", groupEnrolement.findAll);

  //retrieve all students in a group
  router.get("/group/:id", groupEnrolement.findAllStudentsInGroup);

  //retrieve the count of the students in a group
  router.get("/studentcount/group/:id", groupEnrolement.getCountOfStudentsInGroup);

  //update
  router.put("/:id", groupEnrolement.update);

  //delete
  router.delete("/:id", groupEnrolement.remove);

  app.use('/api/groupenrolement', router);
}