import axios from "axios";

const AUTH_SERVER_ADDRESS = 'http://localhost:8080';

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

async function register(user) {
  try {
    const response = await axios.post(`${this.AUTH_SERVER_ADDRESS}/api/users`,
      user,
      getOptions(user)
    );

    if (response.user) {
      localStorage.setItem('token', response.data.access_token);
    }
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

async function login(user) {
  try {
    const response = await axios.post(`${AUTH_SERVER_ADDRESS}/api/users/signin`, null, getOptions(user));
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
    const response = await axios.post(`${AUTH_SERVER_ADDRESS}/api/users/my-role`, null, setTokenOptions())
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
  console.log('a')
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
    default:
      navigate('/')
      break;
  }
}

export default {
  register,
  login,
  logout,
  isLoggedIn,
  getMyRole,
  navigateByRole
}