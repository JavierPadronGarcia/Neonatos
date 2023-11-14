const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const caseId = req.body.caseId;
  const name = req.body.name;

  if (!caseId || !name) {
    return res.status(403).send({ message: "Please fill all fields" });
  }

  const newItem = {
    CaseId: caseId,
    name: name,
  }

  Item.create(newItem).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      error: err.message || "Error creating a new item"
    });
  });
};

exports.findAll = (req, res) => {
  Item.findAll().then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving items"
    });
  });
}

exports.findOne = (req, res) => {
  let id = req.params.id;
  Item.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      error: err.message || "Some error occurred while retrieving one item"
    })
  })
}

exports.update = (req, res) => {
  let id = req.params.id;
  const caseId = req.body.caseId;
  const name = req.body.name;

  if (!caseId || !name) {
    return res.status(400).send({
      message: "CaseId and name cannot be empty!"
    })
  }

  const updatedItem = {
    id: id,
    CaseId: caseId,
    name: name,
  }

  Item.update(
    updatedItem, {
    where: { id: id }
  }).then(() => res.send('Update successful'))
    .catch(err => {
      res.status(500).send({
        error: err.message || "Some error occurred while updating Items"
      })
    })
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Item.destroy({ where: { id: id } })
    .then(() => res.send("Deletion Successful"))
    .catch(err => {
      res.status(500).send({ error: err })
    })
}