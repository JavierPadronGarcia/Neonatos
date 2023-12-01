const db = require("../models");
const Group = db.groups;
const GroupEnrolement = db.groupEnrolement;
const Teachercourse = db.teachercourse;
const Op = db.Sequelize.Op;

exports.createGroup = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).send({
      error: "You must provide a name"
    });
  }
  const newGroup = { name: name };
  Group.create(newGroup)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err
      });
    });
};

exports.findAllWithCounts = async (req, res) => {
  let studentCount = [];
  let teacherCount = [];
  try {

    studentCount = await Group.findAll({
      attributes: ["id", "name", [db.sequelize.fn('COUNT', '*'), 'StudentCount']],
      include: [
        {
          model: GroupEnrolement,
          attributes: [],
          where: {
            GroupID: {
              [Op.ne]: null
            }
          }
        },
      ],
      group: ['id', 'name'],
    });
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
  try {
    teacherCount = await Group.findAll({
      attributes: ["id", "name", [db.sequelize.fn('COUNT', '*'), 'TeacherCount']],
      include: [
        {
          model: Teachercourse,
          attributes: [],
          where: {
            GroupID: {
              [Op.ne]: null
            }
          }
        },
      ],
      group: ['id', 'name'],
    });
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }

  let newArray = [];

  for (let i = 0; i < teacherCount.length; i++) {
    let teacherGroup = teacherCount[i].dataValues;
    if (studentCount[i]) {
      teacherGroup.StudentCount = studentCount[i].dataValues.StudentCount
    } else {
      teacherGroup.StudentCount = 0
    }
    newArray.push(teacherGroup);
  }

  return res.send(newArray);
};

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