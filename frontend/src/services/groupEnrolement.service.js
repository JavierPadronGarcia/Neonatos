import axios from 'axios';

const endPoint = "http://localhost:8080/api/groupenrolement";

function getOptions(token) {
  let bearerAccess = 'Bearer ' + token;

  let options = {
    headers: {
      'Authorization': bearerAccess,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return options;
}

async function getAllOrderedByGroupDesc() {
  try {
    const response = await axios.get(endPoint + '/orderdesc');
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllStudentsNotInAGroup() {
  try {
    const response = await axios.get(endPoint + '/studentsnotinagroup');
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function assignStudentToGroup(studentId, groupId) {
  const date = new Date();
  const body = new URLSearchParams();
  body.append('GroupID', groupId);
  body.append('UserID', studentId);
  body.append('Date', date);
  try {
    const response = await axios.post(endPoint, body);

    return response.data;
  } catch (err) {
    throw err;
  }
}


export default {
  getAllOrderedByGroupDesc,
  getAllStudentsNotInAGroup,
  assignStudentToGroup
}