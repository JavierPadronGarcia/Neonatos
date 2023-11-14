'use strict';

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groups = require("./group.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.teachercourse = require("./teachercourse.model.js")(sequelize, Sequelize);

//teacher - groups relations
db.users.hasMany(db.teachercourse, {
  foreignKey: 'UserID'
});

db.groups.hasMany(db.teachercourse, {
  foreignKey: 'GroupID'
});

db.teachercourse.belongsTo(db.users, {
  foreignKey: 'UserID'
});

db.teachercourse.belongsTo(db.groups, {
  foreignKey: 'GroupID'
});

module.exports = db;