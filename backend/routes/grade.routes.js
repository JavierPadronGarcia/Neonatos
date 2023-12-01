module.exports = app => {
  const grades = require("../controllers/grade.controller");
  const auth = require('../controllers/auth');
  
  var router = require("express").Router();

  //create a new grade
  router.post("/", auth.isAuthenticated, grades.create);

  //retrieve all grades
  router.get("/", auth.isAuthenticated, grades.findAll);

  //retrieve a single grade by id
  router.get("/:id", auth.isAuthenticated, grades.findOne);

  //update a grade with given id
  router.put("/:id", auth.isAuthenticated, grades.update);

  //delete a grade with given id
  router.delete("/:id", auth.isAuthenticated, grades.delete);

  app.use('/api/grades', router);
};