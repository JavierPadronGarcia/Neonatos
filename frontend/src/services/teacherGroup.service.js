import axios from 'axios';

import { backendTeacherGroupEndpoint } from '../consts/backendEndpoints';

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
    const response = await axios.get(backendTeacherGroupEndpoint + '/orderdesc',
      getOptions(localStorage.getItem('token'))
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllTeachersNotInAGroup() {
  try {
    const response = await axios.get(backendTeacherGroupEndpoint + '/teachernotinagroup',
      getOptions(localStorage.getItem('token'))
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllTeachersInAGroup(groupId) {
  try {
    const response = await axios.get(backendTeacherGroupEndpoint + '/group/' + groupId,
      getOptions(localStorage.getItem('token'))
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAllGroupsAssignedToTeacher(teacherId) {
  try {
    const response = await axios.get(`${backendTeacherGroupEndpoint}/allGroupsAssignedToTeacher/${teacherId}`,
      getOptions(localStorage.getItem('token'))
    );
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
    const response = await axios.post(backendTeacherGroupEndpoint,
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
  getAllTeachersNotInAGroup,
  getAllTeachersInAGroup,
  getAllGroupsAssignedToTeacher,
  assignTeacherToGroup
}