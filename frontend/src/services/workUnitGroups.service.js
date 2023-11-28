import axios from 'axios';

import { backendWorkUnitsGroupsEndpoint } from '../consts/backendEndpoints';

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


async function getAllWorkUnitsWithColorsByGroup(groupId) {
  try {
    const response = await axios.get(`${backendWorkUnitsGroupsEndpoint}/${groupId}`, getOptions(localStorage.getItem('token')))
    const data = await response.data;
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateWorkUnitVisibility(groupId, workUnitId, visibility) {
  try {
    const body = new URLSearchParams();
    body.append('visibility', visibility);

    const response = await axios.put(`${backendWorkUnitsGroupsEndpoint}/${groupId},/${workUnitId}`,
      body,
      getOptions(localStorage.getItem('token'))
    );
    return response;
  } catch (err) {
    throw err;
  }
}



export default {
  getAllWorkUnitsWithColorsByGroup,
  updateWorkUnitVisibility
}