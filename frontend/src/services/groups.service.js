import axios from "axios";

const endPoint = "http://localhost:8080/api/groups";

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

async function getAllGroups() {
  const response = await axios.get(endPoint);
  const groups = await response.data;
  return groups;
}

async function addGroup(groupName) {
  const body = new URLSearchParams();
  body.append("name", groupName);

  const response = await axios.post(endPoint, body, config);
  return response.status;
}

async function updateGroup(updatedGroup) {
  const body = new URLSearchParams();
  body.append("name", updatedGroup.name);

  const response = await axios.put(`${endPoint}/${updatedGroup.id}`, body, config);
  return response;
}

async function deleteGroup(id) {
  const response = await axios.delete(`${endPoint}/${id}`);
  return response
}

export default {
  getAllGroups,
  addGroup,
  updateGroup,
  deleteGroup
}