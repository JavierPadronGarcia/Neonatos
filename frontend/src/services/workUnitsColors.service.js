import axios from 'axios';

import { backendWorkUnitsColorsEndpoint } from '../consts/backendEndpoints';

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


async function getAllWorkUnitsWithColors() {
  try {
    const response = await axios.get(`${backendWorkUnitsColorsEndpoint}`, getOptions(localStorage.getItem('token')))
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}



export default {
  getAllWorkUnitsWithColors,
}