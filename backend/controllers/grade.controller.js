const db = require("../models");
const Grade = db.grade;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const newGrade = {
    value: req.body.value,
    ItemID: req.body.ItemID,
    ExerciseID: req.body.ExerciseID
  }

  if (!newGrade.value || !newGrade.ItemID || !newGrade.ExerciseID) {
    return res.status(400).send({
      error: "Content can not be empty!"
    });
  }

  Grade.create(newGrade).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      error: err
    });
  });
};

exports.findAll = (req, res) => {
  Grade.findAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving grades"
    });
  });
}

exports.findOne = (req, res) => {
  let id = req.params.id;
  Grade.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving one grade"
    })
  })
}

exports.update = (req, res) => {
  const updatedGrade = {
    id: req.params.id,
    value: req.body.value,
    ItemID: req.body.ItemID,
    ExerciseID: req.body.ExerciseID
  }

  if (!updatedGrade.value || !updatedGrade.ItemID || !updatedGrade.ExerciseID) {
    return res.status(400).send({
      error: "Content can not be empty!"
    });
  }

  Grade.update(updatedGrade, { where: { id: updatedGrade.id } }).then(() => {
    res.send('Update successful')
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Error updating a grade"
    })
  })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Grade.destroy({ where: { id: id } })
    .then(() => res.send("Deletion Successful"))
    .catch(err => {
      res.status(500).send({ error: err })
    })
}

