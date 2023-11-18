const db = require("../models");
const GroupEnrolement = db.groupEnrolement;
const User = db.users;
const Group = db.groups;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const userId = req.body.UserID;
  const groupId = req.body.GroupID;
  const date = req.body.Date;

  console.log(userId, groupId, date)

  if (!userId || !groupId || !date) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const groupEnrolement = {
    UserID: userId,
    GroupID: groupId,
    Date: date
  };

  GroupEnrolement.create(groupEnrolement).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating a groupEnrolement"
    });
  });
};

exports.findAll = (req, res) => {
  GroupEnrolement.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error retrieving groupEnrolements"
    });
  });
};

exports.findAllOrderedByGroupDesc = (req, res) => {
  GroupEnrolement.findAll({
    attributes: ['id', 'Date', 'createdAt', 'updatedAt'],
    order: [['GroupID', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'role', 'filename', 'createdAt', 'updatedAt']
      },
      {
        model: Group,
      },
    ]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error retrieving groupEnrolements"
    });
  });
}

exports.findAllStudentsNotInAGroup = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    },
    include: [{
      model: GroupEnrolement,
      attributes: []
    }],
    where: {
      role: 'student',
      '$groupEnrolements.id$': null
    }
  }).then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error retrieving users not in a group."
    });
  });
}

exports.findAllStudentsInGroup = (req, res) => {
  const groupId = req.params.id;
  GroupEnrolement.findAll({
    where: { GroupID: groupId },
    include: [{ model: User }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: err.message || "Error retrieving data"
      });
    });
};

exports.getCountOfStudentsInGroup = (req, res) => {
  const groupId = req.params.id
  GroupEnrolement.count({
    where: { GroupID: groupId }
  }).then(studentsCount => {
    res.send({ count: studentsCount })
  })
}

exports.update = (req, res) => {
  const id = req.params.id;
  const newGroupId = req.body.GroupID;
  const newUserId = req.body.UserID;
  const date = req.body.Date;

  if (!newGroupId || !newUserId || !date) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  GroupEnrolement.findOne({ where: { id: id } }).then(data => {
    if (!data) {
      return res.status(404).send({
        message: "Data not found"
      });
    }
    const groupEnrolement = {
      UserID: newUserId,
      GroupID: newGroupId,
      Date: date
    }

    GroupEnrolement.update(
      groupEnrolement,
      { where: { id: id } }
    ).then(data => {
      res.send({
        message: "Updated succesfully"
      });
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating the data."
      });
    })
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Error retrieving data."
    });
  })
}

exports.remove = (req, res) => {
  const id = req.params.id;
  GroupEnrolement.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      return res.send({
        message: "Group enrolement was deleted successfully!"
      });
    } else {
      return res.send({
        message: `Cannot delete Group enrolement`
      });
    }
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Could not delete Group enrolement with id=" + id
    });
  });
};