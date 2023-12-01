module.exports = app => {
  const workUnitGroups = require("../controllers/workunitgroup.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  // Create a new work unit group 
  router.post("/", auth.isAuthenticated, workUnitGroups.create);

  // Retrieve all works units groups 
  router.get("/", auth.isAuthenticated, workUnitGroups.findAll);

  // Retrieve a single work unit groups with id
  router.get("/:GroupID/:WorkUnitID", auth.isAuthenticated, workUnitGroups.findOne);

  //Retrieve all workUnitGroup with the groupId
  router.get("/:GroupID", auth.isAuthenticated, workUnitGroups.findAllByGroup);

  // Update a work unit group with id
  router.put("/:GroupID/:WorkUnitID", auth.isAuthenticated, workUnitGroups.update);

  // Delete a work unit group with id
  router.delete("/:GroupID/:WorkUnitID", auth.isAuthenticated, workUnitGroups.delete);

  app.use('/api/workunitgroups', router);
}