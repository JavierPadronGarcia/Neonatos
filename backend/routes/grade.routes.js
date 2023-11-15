module.exports = app => {
  const grades = require("../controllers/grade.controller");

  var router = require("express").Router();

  //create a new grade
  router.post("/", grades.create);

  //retrieve all grades
  router.get("/", grades.findAll);

  //retrieve a single grade by id
  router.get("/:id", grades.findOne);

  //update a grade with given id
  router.put("/:id", grades.update);

  //delete a grade with given id
  router.delete("/:id", grades.delete);

  app.use('/api/grades', router);
};