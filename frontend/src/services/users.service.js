import axios from "axios";

const endPoint = 'http://localhost:8080/api/users';

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

async function getAllDirectors() {
  try {
    const response = await axios.get(endPoint + '/directors', getOptions(localStorage.getItem('token')));
    const directors = await response.data;
    return directors;
  } catch (err) {
    throw err;
  }
}

async function assignDirector(prevDirectorId, newDirectorId) {
  try {
    const body = new URLSearchParams();
    if (prevDirectorId) {
      body.append('directorId', prevDirectorId);
    }
    const response = await axios.put(`${endPoint}/assignDirector/${newDirectorId}`, body, getOptions(localStorage.getItem('token')));
    return response;
  } catch (err) {
    throw err;
  }
}

export default {
  getAllDirectors,
  assignDirector
}