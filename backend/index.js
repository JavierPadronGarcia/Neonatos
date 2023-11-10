require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const db = require("./models");

//normal use. Doesn't delete the database data
// db.sequelize.sync();

// //In development, it drops the database data
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
})

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next();

  if (req.headers.authorization.indexOf('Basic ') === 0) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');


  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.sendStatus(401).json({
        error: true,
        message: "Invalid user."
      });

    } else {
      req.user = user;
      req.token = token;
      next();
    }
  })

})

require("./routes/user.routes")(app);
require("./routes/group.routes")(app);

app.listen(port, () => {
  console.log('Server is runing on: ' + port);
});