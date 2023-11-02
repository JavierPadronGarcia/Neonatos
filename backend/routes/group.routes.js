module.exports = app => {
  const groups = require("../controllers/group.controller");

  var router = require("express").Router();

  //create a new group
  router.post("/", groups.createGroup);

  //retrieve all groups
  router.get("/", groups.findAll);

  //retrieve a single group by id
  router.get("/:id", groups.findOne);

  //update a group with given id
  router.put("/:id", groups.update);

  //delete a group with given id
  router.delete("/:id", groups.delete);

  app.use('/api/groups', router);
};