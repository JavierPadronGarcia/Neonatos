import axios from 'axios';

import { backendGroupEnrolementEndpoint } from '../consts/backendEndpoints';

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
    const response = await axios.get(backendGroupEnrolementEndpoint + '/orderdesc',
      getOptions(localStorage.getItem('token'))
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllStudentsInAGroup(groupId) {
  try {
    const response = await axios.get(backendGroupEnrolementEndpoint + '/group/' + groupId,
      getOptions(localStorage.getItem('token'))
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}


async function getAllStudentsNotInAGroup() {
  try {
    const response = await axios.get(
      backendGroupEnrolementEndpoint + '/studentsnotinagroup',
      getOptions(localStorage.getItem('token'))
    );

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
    const response = await axios.post(backendGroupEnrolementEndpoint,
      body,
      getOptions(localStorage.getItem('token'))
    );

    return response.data;
  } catch (err) {
    throw err;
  }
}


export default {
  getAllOrderedByGroupDesc,
  getAllStudentsNotInAGroup,
  getAllStudentsInAGroup,
  assignStudentToGroup
}