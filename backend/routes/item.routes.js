module.exports = app => {
  const Item = require("../controllers/item.controller")

  var router = require("express").Router();
  
  // create an item and assign it to a case
  router.post("/", Item.create);

  // retrieve all items
  router.get("/", Item.findAll);

  // retrieve one item by id
  router.get("/:id", Item.findOne);

  //update one item by id
  router.put("/:id", Item.update);

  //delete one item by id
  router.delete("/:id", Item.delete);

  app.use('/api/item', router);
}