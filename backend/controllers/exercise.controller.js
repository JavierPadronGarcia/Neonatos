const db = require("../models");
const Exercise = db.exercise;
const Case = db.case;
const WorkUnit = db.workUnit;
const WorkUnitGroup = db.workUnitGroup;
const Group = db.groups;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const newExercise = {
    assigned: req.body.assigned,
    CaseID: req.body.CaseID,
    UserID: req.body.UserID
  }

  if (!newExercise.assigned || !newExercise.CaseID || !newExercise.UserID) {
    return res.status(403).send({ message: "Please fill all fields" });
  }

  Exercise.create(newExercise).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      error: err.message || "Error creating a new exercise"
    });
  });
};

exports.findAll = (req, res) => {
  Exercise.findAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving exercises"
    });
  });
}

exports.findOne = (req, res) => {
  let id = req.params.id;
  Exercise.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving one Exercise"
    })
  })
}

exports.findAllExercisesInAGroup = async (req, res) => {
  const { groupId, assigned } = req.params;
  try {
    const result = await db.sequelize.query(`
      SELECT c.id, c.name, ex.assigned, ex.CaseID
      FROM \`${Group.tableName}\` AS g
      JOIN \`${WorkUnitGroup.tableName}\` AS wkug ON wkug.GroupID = g.id 
      JOIN \`${WorkUnit.tableName}\` AS wku ON wku.id = wkug.WorkUnitID
      JOIN \`${Case.tableName}\` AS c ON c.WorkUnitId = wku.id
      JOIN \`${Exercise.tableName}\` AS ex ON ex.CaseID = c.id
      WHERE g.id = ${groupId} AND ex.assigned = ${assigned}
      GROUP BY c.id, c.WorkUnitId, c.name, ex.assigned, ex.CaseID;
    `, { type: db.Sequelize.QueryTypes.SELECT });
    return res.send(result);
  } catch (err) {
    return res.status(500).send({
      error: err.message || "Some error occurred while retrieving the cases and their exercises."
    });
  }
}

exports.update = (req, res) => {
  const updatedExercise = {
    id: req.params.id,
    assigned: req.body.assigned,
    CaseID: req.body.CaseID,
    UserID: req.body.UserID
  }

  if (!updatedExercise.assigned || !updatedExercise.CaseID || !updatedExercise.UserID) {
    return res.status(400).send({
      message: "Exercise data cannot be empty!"
    })
  }

  Exercise.update(
    updatedExercise, {
    where: { id: updatedExercise.id }
  }).then(() => res.send('Update successful'))
    .catch(err => {
      res.status(500).send({
        error: err.message || "Some error occurred while updating Exercises"
      })
    })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Exercise.destroy({ where: { id: id } })
    .then(() => res.send("Deletion Successful"))
    .catch(err => {
      res.status(500).send({ error: err })
    })
}
