module.exports = app => {
  const workUnit = require("../controllers/workunit.controller");

  var router = require("express").Router();

  // Create a new work unit
  router.post("/", workUnit.create);

  // Retrieve all works units
  router.get("/", workUnit.findAll);

  // Retrieve a single work unit with id
  router.get("/:id", workUnit.findOne);

  // Update a work unit with id
  router.put("/:id", workUnit.update);

  // Delete a work unit with id
  router.delete("/:id", workUnit.delete);

  app.use('/api/workunit', router);
}