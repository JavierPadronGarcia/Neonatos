module.exports = app => {
  const colors = require("../controllers/color.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  //create a new color
  router.post("/", auth.isAuthenticated, colors.create);

  //retrieve all colors
  router.get("/", auth.isAuthenticated, colors.findAll);

  //retrieve a single color by id
  router.get("/:id", auth.isAuthenticated, colors.findOne);

  //update a color with given id
  router.put("/:id", auth.isAuthenticated, colors.update);

  //delete a color with given id
  router.delete("/:id", auth.isAuthenticated, colors.delete);

  app.use('/api/colors', auth.isAuthenticated, router);
};