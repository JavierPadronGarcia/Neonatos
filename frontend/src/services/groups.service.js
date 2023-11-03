import axios from "axios";

const endPoint = "http://localhost:8080/api/groups";

async function getAllGroups() {
  const response = await axios.get(endPoint);
  const groups = await response.data;
  return groups;
}

export default {
  getAllGroups
}