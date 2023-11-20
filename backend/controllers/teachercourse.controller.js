const db = require("../models");
const TeacherCourse = db.teachercourse;
const User = db.users;
const Group = db.groups;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  if (!req.body.UserID || !req.body.GroupID) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const group = {
    UserID: req.body.UserID,
    GroupID: req.body.GroupID,
  };

  TeacherCourse.create(group).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the teacher."
    });
  });
};

exports.findAll = (req, res) => {
  TeacherCourse.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error retrieving groups."
    });
  });
};

exports.findAllOrderedByGroupDesc = (req, res) => {
  TeacherCourse.findAll({
    order: [['GroupID', 'DESC']],
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password']
        }
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

exports.findAllTeachersNotInAGroup = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    },
    include: [{
      model: TeacherCourse,
      attributes: []
    }],
    where: {
      role: 'teacher',
      '$TeacherCourses.UserID$': null
    }
  }).then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error retrieving users not in a group."
    });
  });
}

exports.findAllTeacherInCourse = (req, res) => {
  const groupId = req.params.id;
  TeacherCourse.findAll({
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

exports.getCountOfTeachersInCourse = (req, res) => {
  const groupId = req.params.id
  TeacherCourse.count({
    where: { GroupID: groupId }
  }).then(teacherCount => {
    res.send({ count: teacherCount })
  })
}

exports.update = (req, res) => {
  const prevUserId = req.params.userId;
  const prevGroupId = req.params.groupId;
  const newGroupId = req.body.GroupID;
  const newUserId = req.body.UserID;

  if (!prevUserId || !prevGroupId || !newGroupId || !newUserId) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TeacherCourse.findOne({ where: { GroupID: prevGroupId, UserID: prevUserId } }).then(data => {
    if (!data) {
      return res.status(404).send({
        message: "Data not found"
      });
    }
    const teacherCourse = {
      UserID: newUserId,
      GroupID: newGroupId
    }

    TeacherCourse.update(
      teacherCourse,
      { where: { UserID: prevUserId, GroupID: prevGroupId } }
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
  const userId = req.params.userId;
  const groupId = req.params.groupId;

  TeacherCourse.destroy({
    where: { UserID: userId, GroupID: groupId }
  }).then(num => {
    if (num == 1) {
      return res.send({
        message: "Teacher Course was deleted successfully!"
      });
    } else {
      return res.send({
        message: `Cannot delete Teacher Course`
      });
    }
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Could not delete Teacher with id=" + id
    });
  });
};
