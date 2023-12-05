module.exports = app => {
  const exercises = require("../controllers/exercise.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  //create some exercises depends on the body
  router.post("/addExercises", auth.isAuthenticated, exercises.createSomeExercises);

  //create a new exercise
  router.post("/", auth.isAuthenticated, exercises.create);

  //retrieve all exercises in a workUnit assigned to a group
  router.get("/exercisesinagroup/:groupId/:workUnitId",
    auth.isAuthenticated,
    exercises.findAllExercisesInAGroupByWorkUnit
  );

  //retrieve all exercises
  router.get("/", auth.isAuthenticated, exercises.findAll);

  //retrieve a single exercise by id
  router.get("/:id", auth.isAuthenticated, exercises.findOne);

  //update an exercise with given id
  router.put("/:id", auth.isAuthenticated, exercises.update);

  //delete an exercise with given id and filtered with assigned
  router.delete("/:groupId/:workUnitId/:caseId/:assigned/:finishDate", auth.isAuthenticated, exercises.delete);

  app.use('/api/exercises', router);
};