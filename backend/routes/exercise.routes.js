module.exports = app => {
  const exercises = require("../controllers/exercise.controller");

  var router = require("express").Router();

  //create a new exercise
  router.post("/", exercises.create);

  //retrieve all exercises
  router.get("/", exercises.findAll);

  //retrieve a single exercise by id
  router.get("/:id", exercises.findOne);

  //update an exercise with given id
  router.put("/:id", exercises.update);

  //delete an exercise with given id
  router.delete("/:id", exercises.delete);

  app.use('/api/exercises', router);
};