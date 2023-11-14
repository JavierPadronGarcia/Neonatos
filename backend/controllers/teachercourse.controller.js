const db = require("../models");
const TeacherCourse = db.teachercourse;
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.UserID || !req.body.GroupID) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const course = {
    UserID: req.body.GroupID,
    GroupID: req.body.UserID,
  };

  TeacherCourse.create(course).then(data => {
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
        message: err.message || "Error al recuperar los datos."
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
    ).then(response => {
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
