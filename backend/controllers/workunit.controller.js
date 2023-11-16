const db = require("../models");
const WorkUnit = db.workUnit;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  WorkUnit.create({ name: name }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the work unit."
    });
  });
}

exports.findAll = (req, res) => {
  WorkUnit.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Error retrieving all the work units"
    });
  })
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  WorkUnit.findByPk(id).then(unit => {
    res.send(unit)
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Error retrieving one work unit"
    })
  })
}

exports.update = (req, res) => {
  let id = req.params.id;
  WorkUnit.update(req.body, { where: { id: id } })
    .then(() => res.send('Update successful'))
    .catch(err => {
      res.status(500).send({
        error: err.message || "Error updating the work unit"
      })
    })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  WorkUnit.destroy({ where: { id: id } })
    .then(() => res.send("Deletion Successful"))
    .catch(err => {
      res.status(500).send({
        error: err.message || "Error deleting the work unit"
      })
    })
}