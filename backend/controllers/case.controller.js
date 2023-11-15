const db = require("../models");
const Case = db.case;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const workUnit = req.body.workUnit;
  const name = req.body.name;

  if (!workUnit || !name) {
    return res.status(403).send({ message: "Please fill all fields" });
  }

  const newCase = {
    WorkUnitId: workUnit,
    name: name,
  }

  Case.create(newCase).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      error: err.message || "Error creating a new case"
    });
  });
};

exports.findAll = (req, res) => {
  Case.findAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving cases"
    });
  });
}

exports.findOne = (req, res) => {
  let id = req.params.id;
  Case.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving one case"
    })
  })
}

exports.update = (req, res) => {
  let id = req.params.id;
  const workUnit = req.body.workUnit;
  const name = req.body.name;

  if (!workUnit || !name) {
    return res.status(400).send({
      message: "Work unit and name cannot be empty!"
    })
  }

  const updatedCase = {
    id: id,
    WorkUnitId: workUnit,
    name: name,
  }

  Case.update(
    updatedCase, {
    where: { id: id }
  }).then(() => res.send('Update successful'))
    .catch(err => {
      res.status(500).send({
        error: err.message || "Some error occurred while updating cases"
      })
    })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Case.destroy({ where: { id: id } })
    .then(() => res.send("Deletion Successful"))
    .catch(err => {
      res.status(500).send({ error: err })
    })
}
