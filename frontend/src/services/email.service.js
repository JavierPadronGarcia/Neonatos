import axios from 'axios';
import { backendEmailEndpoint } from '../consts/backendEndpoints';


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

async function sendEmail(reportInfo) {
  try {
    const response = await axios.post(`${backendEmailEndpoint}/sendmail`,
      reportInfo,
      getOptions(localStorage.getItem('token'))
    );
    return response;
  } catch (error) {
    throw error
  }
};

export default {
  sendEmail
}