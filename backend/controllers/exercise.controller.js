const db = require("../models");
const Exercise = db.exercise;
const Case = db.case;
const WorkUnit = db.workUnit;
const WorkUnitGroup = db.workUnitGroup;
const Group = db.groups;
const User = db.users;
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

exports.createSomeExercises = (req, res) => {

  const { CaseID, Students, assigned, finishDate } = req.body;
  let newFinishDate = new Date(finishDate)

  const creationExercises = [];
  const splittedStudents = Students.split(',');
  if (newFinishDate instanceof Date && !isNaN(newFinishDate)) {
    splittedStudents.forEach(studentId => {
      creationExercises.push({
        assigned: assigned,
        CaseID: CaseID,
        UserID: studentId,
        finishDate: newFinishDate
      })
    });
  } else {
    splittedStudents.forEach(studentId => {
      creationExercises.push({
        assigned: assigned,
        CaseID: CaseID,
        UserID: studentId,
        finishDate: null
      })
    });
  }

  Exercise.bulkCreate(creationExercises).then(data => {
    return res.send(data)
  })
}

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

exports.findAllExercisesInAGroupByWorkUnit = async (req, res) => {
  const { groupId, workUnitId } = req.params;
  try {
    const result = await db.sequelize.query(`
      SELECT c.id, c.name, ex.finishDate, ex.assigned, ex.CaseID
      FROM \`${Group.tableName}\` AS g
      JOIN \`${WorkUnitGroup.tableName}\` AS wkug ON wkug.GroupID = g.id 
      JOIN \`${WorkUnit.tableName}\` AS wku ON wku.id = wkug.WorkUnitID
      JOIN \`${Case.tableName}\` AS c ON c.WorkUnitId = wku.id
      JOIN \`${Exercise.tableName}\` AS ex ON ex.CaseID = c.id
      WHERE g.id = ${groupId} and wku.id = ${workUnitId}
      GROUP BY c.id, c.WorkUnitId, c.name, ex.assigned, ex.finishDate, ex.CaseID;
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

const formatDate = (finishDate) => {
  const date = new Date(finishDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

exports.getAllStudentsAssignedToExercise = async (req, res) => {
  try {
    const { groupId, workUnitId, caseId, assigned, finishDate } = req.params;
    let formattedDate = null;
    if (finishDate) {
      formattedDate = formatDate(finishDate);
    }

    const result = await db.sequelize.query(`
      SELECT ex.id, u.*
      FROM \`${Group.tableName}\` AS g
      JOIN \`${WorkUnitGroup.tableName}\` AS wkug ON wkug.GroupID = g.id 
      JOIN \`${WorkUnit.tableName}\` AS wku ON wku.id = wkug.WorkUnitID
      JOIN \`${Case.tableName}\` AS c ON c.WorkUnitId = wku.id
      JOIN \`${Exercise.tableName}\` AS ex ON ex.CaseID = c.id
      JOIN \`${User.tableName}\` AS u ON u.id = ex.UserID
      WHERE g.id = ${groupId} 
      AND wku.id = ${workUnitId} 
      AND ex.assigned = ${assigned}
      AND ex.CaseID = ${caseId}
      AND (ex.finishDate like '${formattedDate}' OR ex.finishDate IS NULL)
      ORDER BY u.id asc
    `, { type: db.Sequelize.QueryTypes.SELECT });

    return res.send(result);

  } catch (err) {
    console.log(err.message)

    return res.status(500).send({
      error: err.message || "Some error occurred while retreaving  the exercises"
    });
  }
}

exports.update = async (req, res) => {
  try {
    const { GroupID, WorkUnitID, prevCaseID, CaseID, Students, prevAssigned, assigned, prevDate, finishDate } = req.body;
    const idsToDelete = [];
    let formattedPrevDate = null;
    let formattedFinishDate = null;
    if (finishDate) {
      formattedFinishDate = formatDate(finishDate);
    }

    if (prevDate) {
      formattedPrevDate = formatDate(prevDate);
    }

    const result = await db.sequelize.query(`
    SELECT ex.id
    FROM \`${Group.tableName}\` AS g
    JOIN \`${WorkUnitGroup.tableName}\` AS wkug ON wkug.GroupID = g.id 
    JOIN \`${WorkUnit.tableName}\` AS wku ON wku.id = wkug.WorkUnitID
    JOIN \`${Case.tableName}\` AS c ON c.WorkUnitId = wku.id
    JOIN \`${Exercise.tableName}\` AS ex ON ex.CaseID = c.id
    WHERE g.id = ${GroupID} 
    and wku.id = ${WorkUnitID} 
    and ex.assigned = ${prevAssigned}
    and ex.CaseID = ${prevCaseID}
    and (ex.finishDate like '${formattedPrevDate}' OR ex.finishDate IS NULL)
  `, { type: db.Sequelize.QueryTypes.SELECT });


    console.log(result)

    result.forEach(exercise => {
      idsToDelete.push(exercise.id);
    });

    Exercise.destroy({ where: { id: idsToDelete } }).then(() => {

      const creationExercises = [];
      const splittedStudents = Students.split(',');

      if (assigned === 'true') {
        splittedStudents.forEach(studentId => {
          creationExercises.push({
            assigned: assigned,
            CaseID: CaseID,
            UserID: studentId,
            finishDate: finishDate
          })
        });
      } else {
        splittedStudents.forEach(studentId => {
          creationExercises.push({
            assigned: assigned,
            CaseID: CaseID,
            UserID: studentId,
            finishDate: null
          })
        });
      }

      Exercise.bulkCreate(creationExercises).then(data => {
        return res.send(data)
      })
    }).catch(err => {
      return res.status(500).send({ error: err });
    });

  } catch (err) {
    return res.status(500).send({
      error: err.message || "Some error occurred while deleting the exercises"
    });
  }
}


exports.delete = async (req, res) => {
  try {
    const { groupId, workUnitId, caseId, assigned, finishDate } = req.params;
    const idsToDelete = [];
    let formattedDate = null;
    if (finishDate) {

      const date = new Date(finishDate);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const second = date.getSeconds().toString().padStart(2, '0');

      formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    const result = await db.sequelize.query(`
      SELECT ex.id
      FROM \`${Group.tableName}\` AS g
      JOIN \`${WorkUnitGroup.tableName}\` AS wkug ON wkug.GroupID = g.id 
      JOIN \`${WorkUnit.tableName}\` AS wku ON wku.id = wkug.WorkUnitID
      JOIN \`${Case.tableName}\` AS c ON c.WorkUnitId = wku.id
      JOIN \`${Exercise.tableName}\` AS ex ON ex.CaseID = c.id
      WHERE g.id = ${groupId} 
      AND wku.id = ${workUnitId} 
      AND ex.assigned = ${assigned}
      AND ex.CaseID = ${caseId}
      AND (ex.finishDate like '${formattedDate}' OR ex.finishDate IS NULL)
    `, { type: db.Sequelize.QueryTypes.SELECT });

    console.log(groupId, workUnitId, caseId, assigned, finishDate)

    result.forEach(exercise => {
      idsToDelete.push(exercise.id);
    });

    Exercise.destroy({ where: { id: idsToDelete } }).then(() => {
      return res.send("Deletion Successful");
    }).catch(err => {
      return res.status(500).send({ error: err });
    });

  } catch (err) {
    return res.status(500).send({
      error: err.message || "Some error occurred while deleting the exercises"
    });
  }
}