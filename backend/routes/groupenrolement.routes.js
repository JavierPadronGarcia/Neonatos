module.exports = app => {
  const groupEnrolement = require("../controllers/groupenrolement.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  // assign students to groups or groups to students
  router.post("/", auth.isAuthenticated, groupEnrolement.create);

  // retrieve all data from groupenrolements
  router.get("/", auth.isAuthenticated, groupEnrolement.findAll);

  //retrieve all students in a group
  router.get("/group/:id", auth.isAuthenticated, groupEnrolement.findAllStudentsInGroup);

  //retrieve the count of the students in a group
  router.get("/studentcount/group/:id", auth.isAuthenticated, groupEnrolement.getCountOfStudentsInGroup);

  //retrieve all students ordered by group desc
  router.get("/orderdesc", auth.isAuthenticated, groupEnrolement.findAllOrderedByGroupDesc);

  //retrieve all students not in this table
  router.get("/studentsnotinagroup", auth.isAuthenticated, groupEnrolement.findAllStudentsNotInAGroup);

  //update
  router.put("/:id", auth.isAuthenticated, groupEnrolement.update);

  //delete
  router.delete("/:id", auth.isAuthenticated, groupEnrolement.remove);

  app.use('/api/groupenrolement', router);
}