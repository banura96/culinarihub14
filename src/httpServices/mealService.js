import {getAuthToken} from '../utils/auth'
export async function getAllMeals() {
    let response = await fetch(`http://54.179.42.252:8080/api/v1/product`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + getAuthToken(),
    }
  });
  return response.json();
}

export async function placeOrder() {
  let response = await fetch(`http://54.179.42.252:8080/api/v1/product`, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + getAuthToken(),
  }
});
return response.json();
}