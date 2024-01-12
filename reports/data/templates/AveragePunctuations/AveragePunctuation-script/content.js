// server side script fetching remote data and preparing report data source
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

// call remote http rest api
async function fetchPunctuationsOfUsers(token) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:12080/api/cases', getOptions(token)).then(response => {
            resolve(response.data)
        })
    })
}

async function beforeRender(req, res) {
    const token = req.data.token;
    req.data.user = jwt.decode(token);
    req.data.cases = await fetchPunctuationsOfUsers(token);
}