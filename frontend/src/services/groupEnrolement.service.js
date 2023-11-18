import axios from 'axios';

const endPoint = "http://localhost:8080/api/groupenrolement";

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

export default {
  getAllOrderedByGroupDesc,
  getAllStudentsNotInAGroup
}