const db = require("../models");
const Group = db.groups;
const Op = db.Sequelize.Op;

exports.createGroup = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).send({
      error: "You must provide a name and a description"
    });
  }
  const newGroup = {
    name: name
  };
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

