import axios from 'axios';

import { backendExercisesEndpoint } from '../consts/backendEndpoints';


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

async function getAllExercisesOfTheGroup(groupId) {
  try {
    const response = axios.get(backendExercisesEndpoint, getOptions(localStorage.getItem('token')));
    return (await response).data;
  } catch (err) {
    throw err;
  }
}


export default {
  getAllExercisesOfTheGroup
}