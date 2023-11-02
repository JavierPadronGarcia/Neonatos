const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

//normal use. Doesn't delete the database data
db.sequelize.sync();

//In development, it drops the database data
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// })

require("./routes/group.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.PORT || 8080}`);
});