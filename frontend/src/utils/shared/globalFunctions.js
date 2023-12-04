import { message } from "antd";
import { jwtDecode } from 'jwt-decode';

export const transformArray = (allData) => {
  const groupsMap = new Map();

  for (const groupEnrolement of allData) {
    if (!groupsMap.has(groupEnrolement.group.id)) {
      groupsMap.set(groupEnrolement.group.id, {
        id: groupEnrolement.group.id,
        name: groupEnrolement.group.name,
        users: []
      });
    }

    const group = groupsMap.get(groupEnrolement.group.id);
    group.users.push({ id: groupEnrolement.User.id, username: groupEnrolement.User.username });
  }

  return Array.from(groupsMap.values());
}

export const decodeToken = () => {
  const token = localStorage.getItem('token');
  const tokenDecoded = jwtDecode(token);
  return tokenDecoded;
}

export const loginValidation = (username, password, setInputNameStatus, setInputPasswdStatus, setLoading) => {

  if (!username && !password) {
    message.warning("Por favor, Rellena todos los campos", 5)
    setInputNameStatus('error');
    setInputPasswdStatus('error');
    setLoading(false);
    return false;
  }

  if (!username && password) {
    message.warning("Por favor, Rellena todos los campos", 5)
    setInputNameStatus('error');
    setLoading(false);
    return false;
  }

  if (username && !password) {
    message.warning("Por favor, Rellena todos los campos", 5)
    setInputPasswdStatus('error');
    setLoading(false);
    return false;
  }

  return true;
}


export const activityFormValidation = (selectedCase, selectedStudents, setStatus) => {

  if (!selectedCase && selectedStudents.length === 0) {
    message.warning('Por favor, Rellena todos los campos');
    setStatus({ caseStatus: 'error', studentStatus: 'error' });
    return false;
  }

  if (!selectedCase && selectedStudents.length !== 0) {
    message.warning('Por favor, Selecciona un caso');
    setStatus({ caseStatus: 'error', studentStatus: '' });
    return false;
  }

  if (selectedCase && selectedStudents.length === 0) {
    message.warning('Por favor, Selecciona al menos a un estudiante');
    setStatus({ caseStatus: '', studentStatus: 'error' });
    return false;
  }

  return true;
}

export const activityFormValidationWithDate = (selectedCase, selectedStudents, selectedDate, setStatus) => {

  //case and students not selected
  if (!selectedCase && selectedStudents.length === 0 && selectedDate) {
    message.warning('Por favor, Rellena todos los campos');
    setStatus({ caseStatus: 'error', studentStatus: 'error', dateStatus: '' });
    return false;
  }

  //case and date not selected
  if (!selectedCase && selectedStudents.length !== 0 && !selectedDate) {
    message.warning('Por favor, Rellena todos los campos');
    setStatus({ caseStatus: 'error', studentStatus: '', dateStatus: 'error' });
    return false;
  }

  //case not selected
  if (!selectedCase && selectedStudents.length !== 0 && selectedDate) {
    message.warning('Por favor, Seleeciona un caso');
    setStatus({ caseStatus: 'error', studentStatus: '', dateStatus: '' });
    return false;
  }

  //students and date not selected
  if (selectedCase && selectedStudents.length === 0 && !selectedDate) {
    message.warning('Por favor, Rellena todos los campos');
    setStatus({ caseStatus: '', studentStatus: 'error', dateStatus: 'error' });
    return false;
  }

  //students not selected
  if (selectedCase && selectedStudents.length === 0 && selectedDate) {
    message.warning('Por favor, selecciona al menos a un alumno');
    setStatus({ caseStatus: '', studentStatus: 'error', dateStatus: 'error' });
    return false;
  }

  //date not selected
  if (selectedCase && selectedStudents.length !== 0 && !selectedDate) {
    message.warning('Por favor, Rellena todos los campos');
    setStatus({ caseStatus: '', studentStatus: 'error', dateStatus: 'error' });
    return false;
  }

  return true;
}