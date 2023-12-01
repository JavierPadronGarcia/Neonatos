module.exports = app => {
  const workUnit = require("../controllers/workunit.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();
  // Create a new work unit
  router.post("/", auth.isAuthenticated, workUnit.create);

  // Retrieve all works units
  router.get("/", auth.isAuthenticated, workUnit.findAll);

  // Retrieve a single work unit with id
  router.get("/:id", auth.isAuthenticated, workUnit.findOne);

  // Update a work unit with id
  router.put("/:id", auth.isAuthenticated, workUnit.update);

  // Delete a work unit with id
  router.delete("/:id", auth.isAuthenticated, workUnit.delete);

  app.use('/api/workunit', router);
}