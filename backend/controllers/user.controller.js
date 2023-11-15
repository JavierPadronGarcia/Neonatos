const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const utils = require("../utils");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path')

//Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let user = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    filename: ''
  }


  User.findOne({ where: { username: user.username } }).then(data => {
    if (data) {
      const result = bcrypt.compareSync(user.password, data.password);
      if (!result) return res.status(401).send('Password not valid!');
      const token = utils.generateToken(data);

      const userObj = utils.getCleanUser(data);

      return res.json({ user: userObj, access_token: token });
    }

    user.password = bcrypt.hashSync(req.body.password);

    User.create(user).then(data => {
      console.log(data)
      const token = utils.generateToken(data);
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token })
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      })
    })
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Error retrieving existing users with that username"
    })
  })
}


exports.findByRole = (req, res) => {
  req.send(req.user.role);
}

exports.findAll = (req, res) => {

  User.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    })
  })
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    })
  })
}

exports.update = (req, res) => {
  const id = req.params.id;
  let user = {
    username: req.body.username,
    password: '',
    role: req.body.role,
    filename: ''
  }

  User.findOne({ where: { id: id } }).then(data => {

    if (!data) {
      return res.status(404).send({ message: "Cannot update the user because don't exists" })
    }

    user.password = data.password;
    user.filename = data.filename;

    User.update(user, { where: { id: id } }).then(num => {
      if (num == 1) {
        return res.send({
          message: "User was updated successfully."
        })
      }
      return res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      })
    }).catch(err => {
      return res.status(500).send({
        message: "Error updating User with id=" + id
      });
    })
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving the User."
    })
  })
}

exports.updateWithImage = (req, res) => {
  const userDecoded = utils.decodeToken(req.headers['authorization']);
  const previousImage = req.body.previousImage;
  const updatedUser = {
    id: userDecoded.id,
    username: userDecoded.username,
    password: userDecoded.password,
    role: userDecoded.role,
    filename: req.file ? req.file.filename : null
  }

  if (previousImage !== '') {
    const previousImagePath = path.join(__dirname, '../public/images', previousImage);

    fs.unlink(previousImagePath, err => {
      if (err) {
        return res.status(500).send({ message: "There was an error deleting the previous image" })
      }
    })
  }

  User.update(updatedUser, { where: { id: updatedUser.id } }).then(num => {
    if (num == 1) {
      return res.send({
        message: "User was updated successfully."
      })
    }
    res.send({
      message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
    })
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error updating User with id=" + id
    });
  })
}

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByPk(id).then(user => {
    if (user.filename != '') {
      const imagePath = path.join(__dirname, '../public/images', user.filename);
      fs.unlink(imagePath, err => {
        if (err) {
          return res.status(500).send({ message: "There was an error deleting the image" })
        }
      })
    }
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Could not find the user to delete"
    });
  })

  User.destroy({ where: { id: id } }).then(num => {
    if (num === 1) {
      return res.send({
        message: "User was deleted successfully!"
      })
    }
    return res.send({
      message: `Cannot delete User with id=${id}. Maybe User was not found!`
    })

  }).catch(err => {
    return res.status(500).send({
      message: "Could not delete User with id=" + id
    })
  })
}
