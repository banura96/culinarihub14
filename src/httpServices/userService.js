import {getAuthToken} from '../utils/auth'
export async function userLogin(data) {
  let response = await fetch(`http://54.179.42.252:8080/api/v1/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function userRegister(data) {
  let response = await fetch(`http://54.179.42.252:8080/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + getAuthToken(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
