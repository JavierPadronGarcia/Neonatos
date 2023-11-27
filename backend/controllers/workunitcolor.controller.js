const db = require("../models");
const WorkUnitColor = db.workUnitColor;
const Color = db.color;
const WorkUnit = db.workUnit;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  if (!req.body.WorkUnitId || !req.body.ColorId) {
    return res.status(403).send({
      message: "Content can not be empty!"
    });
  }

  const newWorkUnitColor = {
    WorkUnitId: req.body.WorkUnitId,
    ColorId: req.body.ColorId,
    visibility: req.body.visibility || false,
  }

  WorkUnitColor.create(newWorkUnitColor).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.status(500).send({
      message: "Some error occurred while creating the work unit color."
    })
  });
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

exports.findAll = (req, res) => {
  WorkUnitColor.findAll(
    {
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
    }).then(data => {
      const transformedArray = Object.values(transformArray(data));
      return res.send(transformedArray);
    }).catch(err => {
      return res.status(500).send({
        message: err.message || "Error retrieving all Work units colors"
      });
    })
}

exports.findOne = (req, res) => {
  const { workUnitId, colorId } = req.params;

  WorkUnitColor.findOne({
    where: {
      WorkUnitId: workUnitId,
      ColorId: colorId
    }
  }).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.status(500).send({
      message: `Error retrieving one ${err}`
    });
  });
}

exports.update = (req, res) => {
  const { workUnitId, colorId } = req.params;

  const newWorkUnitColor = {
    WorkUnitId: req.body.WorkUnitId,
    ColorId: req.body.ColorId,
    visibility: req.body.visibility || false,
  }

  WorkUnitColor.update(newWorkUnitColor, {
    where: {
      WorkUnitId: workUnitId,
      ColorId: colorId
    }
  }).then(num => {
    if (num == 1) {
      return res.send({
        message: "workUnitColor was updated successfully!"
      });
    }

    return res.status(500).send({
      message: `Cannot update the workUnitColor with id=${id}. Maybe workUnitColor was not found or req.body is empty!`
    })

  }).catch(err => {
    return res.status(500).send({
      message: `Error updating the workUnitColor with id=${id}: \n${err}`
    });
  });
}

exports.delete = (req, res) => {
  const { workUnitId, colorId } = req.params;

  WorkUnitColor.destroy({
    where: {
      WorkUnitId: workUnitId,
      ColorId: colorId
    }
  }).then(num => {
    if (num == 1) {
      return res.send({
        message: "workUnitColor deleted successfully!"
      });
    }

    return res.status(500).send({
      message: `Cannot update the workUnitColor with id=${id}. Maybe workUnitColor was not found or req.body is empty!`
    })

  }).catch(err => {
    return res.status(500).send({
      message: `Could not delete workUnitColor with id=${id}: \n${err}`
    });
  });
};