module.exports = app => {
  const users = require("../controllers/user.controller")
  const auth = require("../controllers/auth");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);
  // Retrieve all Users
  router.get("/", auth.isAuthenticated, users.findAll);
  // Retrieve a single user with id
  router.get("/:id", auth.isAuthenticated, users.findOne);

  // Update a User with id
  router.put("/:id", auth.isAuthenticated, users.update);
  //Sign in
  router.post('/signin', auth.signin);

  //get the role of the user authenticated
  router.post("/my-role", auth.isAuthenticated, auth.getRole);

  app.use('/api/users', router);
}