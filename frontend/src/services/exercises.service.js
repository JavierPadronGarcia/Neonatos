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
  body.append('assigned', assigned || false);
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

async function updateExercises(updateData) {
  const body = new URLSearchParams();
  body.append('GroupID', updateData.groupId);
  body.append('WorkUnitID', updateData.workUnitId);
  body.append('prevCaseID', updateData.prevCaseId);
  body.append('CaseID', updateData.caseId);
  body.append('Students', updateData.students);
  body.append('prevAssigned', updateData.prevAssigned);
  body.append('assigned', updateData.assigned);
  body.append('prevDate', updateData.prevDate)
  body.append('finishDate', updateData.finishDate);
  console.log(updateData.students)
  try {
    const response = axios.put(`${backendExercisesEndpoint}/updateExercises`,
      body,
      getOptions(localStorage.getItem('token'))
    );
    return (await response).data;
  } catch (err) {
    throw err;
  }
}

async function deleteExercise(groupId, workUnitId, caseId, assigned, date) {
  try {
    const response = axios.delete(`${backendExercisesEndpoint}/${groupId}/${workUnitId}/${caseId}/${assigned}/${date}`,
      getOptions(localStorage.getItem('token'))
    );
    return (await response).data;
  } catch (err) {
    throw err;
  }
}

async function getAllStudentsAssignedInActivity(groupId, workUnitId, caseId, assigned, date) {
  try {
    const response = axios.get(`${backendExercisesEndpoint}/studentsAssignedToExercise/${groupId}/${workUnitId}/${caseId}/${assigned}/${date}`,
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
  updateExercises,
  deleteExercise,
  getAllStudentsAssignedInActivity
}