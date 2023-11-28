module.exports = app => {
  const workUnitColors = require("../controllers/workunitcolor.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  // Create a new work unit color
  router.post("/", auth.isAuthenticated, workUnitColors.create);

  // Retrieve all works units colors
  router.get("/", auth.isAuthenticated, workUnitColors.findAll);

  // Retrieve a single work unit color with id
  router.get("/:workUnitId/:colorId", auth.isAuthenticated, workUnitColors.findOne);

  // Update a work unit color with id
  router.put("/:workUnitId/:colorId", auth.isAuthenticated, workUnitColors.update);

  // Delete a work unit color with id
  router.delete("/:workUnitId/:colorId", auth.isAuthenticated, workUnitColors.delete);

  app.use('/api/workunitcolors', router);
}