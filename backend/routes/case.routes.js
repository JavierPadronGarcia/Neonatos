module.exports = app => {
  const cases = require("../controllers/case.controller");

  var router = require("express").Router();

  //create a new case
  router.post("/", cases.create);

  //retrieve all cases
  router.get("/", cases.findAll);

  //retrieve a single case by id
  router.get("/:id", cases.findOne);

  //update a case with given id
  router.put("/:id", cases.update);

  //delete a case with given id
  router.delete("/:id", cases.delete);

  app.use('/api/cases', router);
};