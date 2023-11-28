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
  let workUnitColor = [];
  let workUnitGroup = [];
  let workUnitColorsIds = [];
  let newArray = [];
  try {
    workUnitColor = await WorkUnitColor.findAll({
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
  } catch (err) {
    return res.status(500).send(
      { message: `Error getting all work units for group ${GroupID}` }
    )
  }
  const workUnitColorTransformed = Object.values(await transformArray(workUnitColor));

  workUnitColorTransformed.map((data, index) => {
    workUnitColorsIds[index] = data.id;
  })

  try {
    workUnitGroup = await WorkUnitGroup.findAll({
      where: {
        GroupID: GroupID,
        WorkUnitID: {
          [Op.in]: workUnitColorsIds
        }
      },
      include: [
        { model: WorkUnit }
      ]
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error getting all work units with colors for group ${GroupID}`
    })
  }

  workUnitGroup.map((data, index) => {
    data = data.get({ plain: true });
    const workUnitWithColor = workUnitColorTransformed.find(workUnitColor => workUnitColor.id === data.WorkUnitID);
    data.workUnit = workUnitWithColor;
    newArray[index] = data;
  })

  return res.send(newArray);
}

exports.update = (req, res) => {
  const { GroupID, WorkUnitID } = req.params;

  WorkUnitGroup.findOne({
    where: {
      GroupID: GroupID,
      WorkUnitID: WorkUnitID
    }
  }).then(workUnitGroup => {
    if (!workUnitGroup) {
      return res.status(404).send({
        message: "Work Unit not found"
      })
    }
    workUnitGroup.visibility = req.body.visibility || false;
    workUnitGroup.save();
    return res.send({ message: 'WorkUnitGroup updated succesfully' });
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occurred while updating the WorkUnitGroup."
    })
  })
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