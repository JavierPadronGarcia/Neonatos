import axios from "axios";

const endPoint = "http://localhost:8080/api/groups";

function getOptions(token) {
  let bearerAccess = 'Bearer ' + token;

  let options = {
    headers: {
      'Authorization': bearerAccess,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return options
}

async function getAllGroups() {
  const response = await axios.get(endPoint, getOptions(localStorage.getItem("token")));
  const groups = await response.data;
  return groups;
}

async function addGroup(groupName) {
  const body = new URLSearchParams();
  body.append("name", groupName);

  const response = await axios.post(endPoint, body, getOptions(localStorage.getItem("token")));
  return response.status;
}

async function updateGroup(updatedGroup) {
  const body = new URLSearchParams();
  body.append("name", updatedGroup.name);

  const response = await axios.put(`${endPoint}/${updatedGroup.id}`, body, getOptions(localStorage.getItem("token")));
  return response;
}

async function deleteGroup(id) {
  const response = await axios.delete(`${endPoint}/${id}`, getOptions(localStorage.getItem("token")));
  return response
}

export default {
  getAllGroups,
  addGroup,
  updateGroup,
  deleteGroup
}