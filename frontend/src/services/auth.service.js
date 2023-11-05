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

async function register(user) {
  try {
    const response = await axios.post(`${this.AUTH_SERVER_ADDRESS}/api/users`,
      user,
      this.getOptions(user)
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
    }
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

async function logout() {
  localStorage.remove("token")
}

async function isLoggedIn() {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
}

export default {
  register,
  login,
  logout,
  isLoggedIn
}