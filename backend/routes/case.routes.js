module.exports = app => {
  const cases = require("../controllers/case.controller");
  const auth = require('../controllers/auth');

  var router = require("express").Router();

  //create a new case
  router.post("/", auth.isAuthenticated, cases.create);

  //retrieve all cases in a group
  router.get("/byGroup/:groupId/:workUnitId", auth.isAuthenticated, cases.findAllCasesInAGroup);

  //retrieve all cases
  router.get("/", auth.isAuthenticated, cases.findAll);

  //retrieve a single case by id
  router.get("/:id", auth.isAuthenticated, cases.findOne);

  //update a case with given id
  router.put("/:id", auth.isAuthenticated, cases.update);

  //delete a case with given id
  router.delete("/:id", auth.isAuthenticated, cases.delete);

  app.use('/api/cases', auth.isAuthenticated, router);
};