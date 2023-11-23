import axios from 'axios';

const endPoint = "http://localhost:8080/api/teachercourse";

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
    const response = await axios.get(endPoint + '/orderdesc', getOptions(localStorage.getItem('token')));
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllTeachersNotInAGroup() {
  try {
    const response = await axios.get(endPoint + '/teachernotinagroup', getOptions(localStorage.getItem('token')));
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllTeachersInAGroup(groupId) {
  try {
    const response = await axios.get(endPoint + '/group/' + groupId, getOptions(localStorage.getItem('token')))
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function assignTeacherToGroup(teacherid, groupId) {
  const body = new URLSearchParams();
  body.append('GroupID', groupId);
  body.append('UserID', teacherid);
  try {
    const response = await axios.post(endPoint, body, getOptions(localStorage.getItem('token')));
    return response.data;
  } catch (err) {
    throw err;
  }
}


export default {
  getAllOrderedByGroupDesc,
  getAllTeachersNotInAGroup,
  getAllTeachersInAGroup,
  assignTeacherToGroup
}