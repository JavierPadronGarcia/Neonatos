module.exports = app => {
  const groups = require("../controllers/group.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  //create a new group
  router.post("/", auth.isAuthenticated, groups.createGroup);

  //retrieve all groups
  router.get("/", auth.isAuthenticated, groups.findAll);

  //retrieve a single group by id
  router.get("/:id", auth.isAuthenticated, groups.findOne);

  //update a group with given id
  router.put("/:id", auth.isAuthenticated, groups.update);

  //delete a group with given id
  router.delete("/:id", auth.isAuthenticated, groups.delete);

  app.use('/api/groups', router);
};