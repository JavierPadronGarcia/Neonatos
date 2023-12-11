import axios from "axios";
import { backendGroupsEndpoint } from '../consts/backendEndpoints';

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

async function getAllGroupsWithoutCount() {
  try {
    const response = await axios.get(backendGroupsEndpoint,
      getOptions(localStorage.getItem("token"))
    );
    const groups = await response.data;
    return groups;
  } catch (err) {
    throw err;
  }
}

async function getAllGroups() {
  try {
    const response = await axios.get(backendGroupsEndpoint + '/withCounts',
      getOptions(localStorage.getItem("token"))
    );
    const groups = await response.data;
    return groups;
  } catch (err) {
    throw err;
  }
}

async function addGroup(groupName) {
  const body = new URLSearchParams();
  body.append("name", groupName);
  let response = [];
  try {
    response = await axios.post(backendGroupsEndpoint,
      body,
      getOptions(localStorage.getItem("token"))
    );
  } catch (err) {
    throw err;
  }
  return response.status;
}

async function updateGroup(updatedGroup) {
  const body = new URLSearchParams();
  body.append("name", updatedGroup.name);

  try {
    const response = await axios.put(`${backendGroupsEndpoint}/${updatedGroup.id}`,
      body,
      getOptions(localStorage.getItem("token"))
    );
    return response;
  } catch (err) {
    throw err;
  }
}

async function deleteGroup(id) {
  try {
    const response = await axios.delete(`${backendGroupsEndpoint}/${id}`,
      getOptions(localStorage.getItem("token"))
    );

    return response;
  } catch (err) {
    throw err;
  }
}

export default {
  getAllGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  getAllGroupsWithoutCount
}