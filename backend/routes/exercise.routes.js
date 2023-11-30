module.exports = app => {
  const exercises = require("../controllers/exercise.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  //create a new exercise
  router.post("/", auth.isAuthenticated, exercises.create);

  //retrieve all exercises
  router.get("/exercisesinagroup/:groupId/:assigned", auth.isAuthenticated, exercises.findAllExercisesInAGroup);

  //retrieve all exercises
  router.get("/", auth.isAuthenticated, exercises.findAll);

  //retrieve a single exercise by id
  router.get("/:id", auth.isAuthenticated, exercises.findOne);

  //update an exercise with given id
  router.put("/:id", auth.isAuthenticated, exercises.update);

  //delete an exercise with given id
  router.delete("/:id", auth.isAuthenticated, exercises.delete);

  app.use('/api/exercises', router);
};