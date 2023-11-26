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
db.exercise = require('./exercise.model.js')(sequelize, Sequelize);
db.grade = require('./grade.model.js')(sequelize, Sequelize);
db.color = require('./color.model.js')(sequelize, Sequelize);
db.workUnitColor = require('./workUnitColor.model.js')(sequelize, Sequelize);

//teacher - groups relations
db.users.hasMany(db.teachercourse, { foreignKey: 'UserID' });
db.groups.hasMany(db.teachercourse, { foreignKey: 'GroupID' });

db.teachercourse.belongsTo(db.users, { foreignKey: 'UserID' });
db.teachercourse.belongsTo(db.groups, { foreignKey: 'GroupID' });

//student - groups relations
db.users.hasMany(db.groupEnrolement, { foreignKey: 'UserID' });
db.groups.hasMany(db.groupEnrolement, { foreignKey: 'GroupID' });

db.groupEnrolement.belongsTo(db.users, { foreignKey: 'UserID' });
db.groupEnrolement.belongsTo(db.groups, { foreignKey: 'GroupID' });

//work unit - case relations
db.workUnit.hasMany(db.case, { foreignKey: 'WorkUnitId' });

//work unit - color relations
db.workUnit.hasMany(db.workUnitColor, { foreignKey: 'WorkUnitId' });
db.color.hasMany(db.workUnitColor, { foreignKey: 'ColorId' });

db.workUnitColor.belongsTo(db.workUnit, { foreignKey: 'WorkUnitId' });
db.workUnitColor.belongsTo(db.color, { foreignKey: 'ColorId' });

//items - cases relations
db.case.hasMany(db.item, { foreignKey: 'CaseId' });

//exercises relations
db.exercise.belongsTo(db.case, { foreignKey: 'CaseID' })
db.exercise.belongsTo(db.users, { foreignKey: 'UserID' })

//grade relations
db.grade.belongsTo(db.item, { foreignKey: 'ItemID' });
db.grade.belongsTo(db.exercise, { foreignKey: 'ExerciseID' });

module.exports = db;