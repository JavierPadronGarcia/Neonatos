const db = require("../models");
const Color = db.color;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  if (!req.body.primaryColor || !req.body.secondaryColor || !req.body.text) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const color = {
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor,
    text: req.body.text
  };

  Color.create(color).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the color."
    });
  });
};

exports.findAll = (req, res) => {
  Color.findAll().then(data => {
    return res.send(data);
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error retrieving colors"
    });
  });
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Color.findOne(id).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.status(500).send({
      message: `Error retrieving color with id=${id}`
    });
  })
}

exports.update = (req, res) => {
  const id = req.params.id;

  const newColor = {
    primaryColor: req.body.primaryColor,
    secondaryColor: req.body.secondaryColor,
    text: req.body.text,
  }

  Color.update(newColor, { where: { id: id } }).then(num => {
    if (num === 1) {
      return res.send({
        message: "Color was updated successfully!"
      });
    }

    return res.send({
      message: `Cannot update color with id=${id}. Maybe color was not found or req.body is empty!`
    });

  }).catch(err => {
    return res.status(500).send({
      message: `Error updating color with id=${id}: ${err.message}`
    });
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Color.destroy({ where: { id: id } }).then(num => {
    if (num == 1) {
      return res.send({
        message: "color deleted Successfully!"
      })
    }

    return res.send({
      message: `Cannot delete color with id=${id}. It was not found.`
    })

  }).catch(err => {
    return res.status(500).send({
      message: `Could not delete color with id=${id}: ${err.message}`
    });
  });
}
