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

async function getAllExercisesOfTheGroup(groupId, workUnitId) {
  try {
    const response = axios.get(`${backendExercisesEndpoint}/exercisesinagroup/${groupId}/${workUnitId}`,
      getOptions(localStorage.getItem('token'))
    );
    return (await response).data;
  } catch (err) {
    throw err;
  }
}

async function addExercises(caseId, students, assigned, date) {
  const body = new URLSearchParams();
  body.append('CaseID', caseId);
  body.append('Students', students);
  body.append('assigned', assigned);
  body.append('finishDate', date);
  try {
    const response = axios.post(`${backendExercisesEndpoint}/addExercises`,
      body,
      getOptions(localStorage.getItem('token'))
    );
    return (await response).data;
  } catch (err) {
    throw err;
  }
}

async function deleteExercise(groupId, workUnitId, caseId, assigned) {
  try {
    const response = axios.delete(`${backendExercisesEndpoint}/${groupId}/${workUnitId}/${caseId}/${assigned}`,
      getOptions(localStorage.getItem('token'))
    );
    return (await response).data;
  } catch (err) {
    throw err;
  }
}

export default {
  getAllExercisesOfTheGroup,
  addExercises,
  deleteExercise
}