module.exports = app => {
  const Item = require("../controllers/item.controller")
  const auth = require('../controllers/auth');
  
  var router = require("express").Router();

  // create an item and assign it to a case
  router.post("/", auth.isAuthenticated, Item.create);

  // retrieve all items
  router.get("/", auth.isAuthenticated, Item.findAll);

  // retrieve one item by id
  router.get("/:id", auth.isAuthenticated, Item.findOne);

  //update one item by id
  router.put("/:id", auth.isAuthenticated, Item.update);

  //delete one item by id
  router.delete("/:id", auth.isAuthenticated, Item.delete);

  app.use('/api/item', router);
}