const axios = require('axios');
const jwt = require('jsonwebtoken');

function getOptions(token) {
    let bearerAccess = 'Bearer ' + token;

    let options = {
        headers: {
            'Authorization': bearerAccess,
        }
    }
    return options;
}

async function fetchUserActivities(token, params) {
    return new Promise((resolve, reject) => {
        const {groupId, workUnitId, caseId, assigned, finishDate} = params;

        axios.get(`http://localhost:12080/api/exercises/studentsAssignedToExerciseWithDetails/${groupId}/${workUnitId}/${caseId}/${assigned}/${finishDate}`,
            getOptions(token)).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err.message);
        })
    })
}

async function beforeRender(req, res) {
    const token = req.data.token;
    req.data.user = jwt.decode(token);
    req.data.userActivities = await fetchUserActivities(token, req.data.params);
}