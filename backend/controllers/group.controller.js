const db = require("../models");
const Group = db.groups;
const WorkUnit = db.workUnit;
const GroupEnrolement = db.groupEnrolement;
const Teachercourse = db.teachercourse;
const WorkUnitGroup = db.workUnitGroup;
const Op = db.Sequelize.Op;

exports.createGroup = (req, res) => {
  const name = req.body.name;
  const workUnitGroupCreation = [];

  if (!name) {
    return res.status(400).send({
      error: "You must provide a name"
    });
  }
  const newGroup = { name: name };

  Group.create(newGroup).then((group) => {
    //find all the work units to assign them to the new group
    WorkUnit.findAll().then(allWorkUnits => {
      //create all the rows to assign al work units to its group
      allWorkUnits.forEach(workUnit => {
        workUnitGroupCreation.push({
          GroupID: group.id,
          WorkUnitID: workUnit.id,
          visibility: false
        })
      })
      //create all whe workUnitGroups
      WorkUnitGroup.bulkCreate(workUnitGroupCreation).then(response => {
        res.send(group);
      })
    })
  }).catch((err) => {
    res.status(500).send({
      error: err
    });
  });
};

exports.findAllWithCounts = async (req, res) => {
  let studentCount = [];
  let teacherCount = [];
  try {
    studentCount = await db.sequelize.query(`
      SELECT gr.id, gr.name, COALESCE(COUNT(gre.GroupID), 0) AS StudentCount
      FROM \`${Group.tableName}\` AS gr
      LEFT JOIN \`${GroupEnrolement.tableName}\` AS gre ON gr.id = gre.GroupID
      GROUP BY gr.id, gr.name
    `, { type: db.Sequelize.QueryTypes.SELECT });
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
  try {
    teacherCount = await db.sequelize.query(`
      SELECT gr.id, gr.name, COALESCE(COUNT(the.GroupID), 0) AS TeacherCount
      FROM \`${Group.tableName}\` AS gr
      LEFT JOIN \`${Teachercourse.tableName}\` AS the ON gr.id = the.GroupID
      GROUP BY gr.id, gr.name
    `, { type: db.Sequelize.QueryTypes.SELECT });
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
  const mergedArray = await mergeArrays(teacherCount, studentCount);
  return res.send(mergedArray);
};

const mergeArrays = (arr1, arr2) => {
  return arr1.map(item1 => {
    const matchingItem = arr2.find(item2 => item1.id === item2.id && item1.name === item2.name);
    return {
      ...item1,
      StudentCount: matchingItem ? matchingItem.StudentCount : 0
    };
  });
}

exports.findAll = (req, res) => {
  Group.findAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving groups"
    });
  });
}

exports.findOne = (req, res) => {
  let id = req.params.id;
  Group.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: err
      })
    })
}

exports.update = (req, res) => {
  let id = req.params.id;
  Group.update(req.body, { where: { id: id } })
    .then(() => res.send('Update successful'))
    .catch(err => {
      res.status(500).send({
        error: err
      })
    })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Group.destroy({ where: { id: id } })
    .then(() => res.send("Deletion Successful"))
    .catch(err => {
      res.status(500).send({ error: err })
    })
}