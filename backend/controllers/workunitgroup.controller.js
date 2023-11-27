const db = require("../models");
const WorkUnitGroup = db.workUnitGroup;
const WorkUnit = db.workUnit;
const Group = db.groups;
const WorkUnitColor = db.workUnitColor;
const Color = db.color;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.GroupID || !req.body.WorkUnitID) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const newWorkUnitGroup = {
    GroupID: req.body.GroupID,
    WorkUnitID: req.body.WorkUnitID,
    visibility: req.body.visibility || false
  }

  WorkUnitGroup.create(newWorkUnitGroup).then(workUnitGroup => {
    return res.send(workUnitGroup);
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the work unit group."
    })
  });
}

exports.findAll = (req, res) => {
  WorkUnitGroup.findAll({
    include: [
      { model: WorkUnit },
      { model: Group }
    ]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving work units groups."
    });
  })
}

exports.findOne = async (req, res) => {
  const { GroupID, WorkUnitID } = req.params;

  WorkUnitGroup.findOne({
    where: {
      GroupId: GroupID,
      WorkUnitID: WorkUnitID
    },
    include: [
      { model: Group },
      { model: WorkUnit }
    ]
  }).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.status(500).send({
      message: `Error retrieving work unit with id ${GroupID} and ${WorkUnitID}`
    })
  })
}

const transformArray = (array) => {
  return array.reduce((acc, obj) => {
    const propertyName = obj.visibility ? 'visible' : 'invisible';
    const colorObject = {
      id: obj.color.id,
      primaryColor: obj.color.primaryColor,
      secondaryColor: obj.color.secondaryColor,
      text: obj.color.text
    };

    acc[obj.workUnit.name] = acc[obj.workUnit.name] || {
      id: obj.workUnit.id,
      name: obj.workUnit.name,
      visibility: obj.visibility,
      colors: {}
    };

    acc[obj.workUnit.name].colors[propertyName] = colorObject;

    return acc;
  }, {});
}

exports.findAllByGroup = async (req, res) => {
  const { GroupID } = req.params;

  const workUnitGroup = await WorkUnitGroup.findAll(
    { where: { GroupID: GroupID } }
  );

  const workUnitColor = await WorkUnitColor.findAll({
    include: [
      {
        model: Color,
        attributes: ['id', 'primaryColor', 'secondaryColor', 'text']
      },
      {
        model: WorkUnit,
        attributes: ['id', 'name']
      },
    ]
  })
  const workUnitColorTransformed = Object.values(await transformArray(workUnitColor));

  const combinedresult = workUnitColorTransformed.map(workUnitColor => {
    const matchingGroup = workUnitGroup.find(workUnitGroup =>
      workUnitGroup.WorkUnitID === workUnitColor.id
    )
    console.log(matchingGroup)
  })


  res.send(workUnitColorTransformed);
}

exports.update = (req, res) => {
  const { GroupID, WorkUnitID } = req.params;

  if (!req.body.GroupID || !req.body.WorkUnitID) {
    return res.status(500).send({
      message: "Content cannot be empty!"
    })
  }

  const updatedWorkUnitGroup = {
    GroupID: req.body.GroupID,
    WorkUnitID: req.body.WorkUnitID,
    visibility: req.body.visibility || false
  }

  WorkUnitGroup.update(updatedWorkUnitGroup, {
    where: {
      GroupId: GroupID,
      WorkUnitID: WorkUnitID
    }
  }).then(num => {
    if (num == 1) {
      return res.send({
        message: "workUnitGroup was updated successfully!"
      });
    }

    return res.status(500).send({
      message: `Cannot update the workUnitGroup with id=${id}. Maybe workUnitGroup was not found or req.body is empty!`
    })

  }).catch(err => {
    return res.status(500).send({
      message: `Error updating the workUnitGroup with id=${id}: \n${err}`
    });
  });
}

exports.delete = (req, res) => {
  const { GroupID, WorkUnitID } = req.params;

  WorkUnitGroup.destroy({
    where: {
      WorkUnitId: WorkUnitID,
      GroupID: GroupID
    }
  }).then(num => {
    if (num == 1) {
      return res.send({
        message: "workUnitGroup deleted successfully!"
      });
    }

    return res.status(500).send({
      message: `Cannot update the workUnitGroup with id=${id}. Maybe workUnitGroup was not found or req.body is empty!`
    })

  }).catch(err => {
    return res.status(500).send({
      message: `Could not delete workUnitGroup with id=${id}: \n${err}`
    });
  });
};