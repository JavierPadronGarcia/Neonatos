import axios from "axios";
import { backendUsersEndpoint } from '../consts/backendEndpoints';

function getOptions(user) {
  let base64UserAndPassword = window.btoa(user.username + ":" + user.password);

  let basicAccess = 'Basic ' + base64UserAndPassword;

  let options = {
    headers: {
      'Authorization': basicAccess,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return options;
}

function setTokenOptions() {
  const token = localStorage.getItem("token");

  let options = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  return options;
}

async function login(user) {
  try {
    const response = await axios.post(`${backendUsersEndpoint}/signin`, null, getOptions(user));
    if (response.data.user) {
      localStorage.setItem("token", response.data.access_token);
      return response.data.user.role;
    }
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

async function logout() {
  localStorage.removeItem("token");
  return;
}

async function getMyRole() {
  try {
    const response = await axios.post(`${backendUsersEndpoint}/my-role`, null, setTokenOptions())
    return response.data.role
  } catch (err) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw err;
  }
}

function isLoggedIn() {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
}

const navigateByRole = (role, navigate) => {
  switch (role) {
    case 'admin':
      navigate('/admin/control-panel');
      break;
    case 'teacher':
      navigate('/teacher-groups');
      break;
    case 'student':
      navigate('/student-groups');
      break;
    case 'director':
      navigate('/director-panel');
      break;
  }
}

export default {
  login,
  logout,
  isLoggedIn,
  getMyRole,
  navigateByRole
}