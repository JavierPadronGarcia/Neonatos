module.exports = app => {
  const auth = require('../controllers/auth');
  const multer = require('multer');
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  const Mailer = require('../controllers/mailer.controller.js');

  var router = require("express").Router();

  router.post("/sendmail", auth.isAuthenticated, upload.single('pdf'), Mailer.sendMail);

  app.use('/api/mailer', router);
}