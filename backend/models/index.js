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
db.groupEnrolement = require("./groupenrolement.model.js")(sequelize, Sequelize);
db.workUnit = require('./workunit.model.js')(sequelize, Sequelize);
db.case = require('./case.model.js')(sequelize, Sequelize);
db.item = require('./item.model.js')(sequelize, Sequelize);

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

//student - groups relations
db.users.hasMany(db.groupEnrolement, {
  foreignKey: 'UserID'
});

db.groups.hasMany(db.groupEnrolement, {
  foreignKey: 'GroupID'
});

db.groupEnrolement.belongsTo(db.users, {
  foreignKey: 'UserID'
});

db.groupEnrolement.belongsTo(db.groups, {
  foreignKey: 'GroupID'
});

//work unit - case relations
db.workUnit.hasMany(db.case, { foreignKey: 'WorkUnitId' });


//items - cases relations
db.case.hasMany(db.item, { foreignKey: 'CaseId' });


module.exports = db;

module.exports = db;