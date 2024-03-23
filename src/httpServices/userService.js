export async function userLogin(data) {
  let response = await fetch(`http://54.179.42.252:8080/api/v1/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function userRegister(data) {
  let response = await fetch(`http://54.179.42.252:8080/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // console.log(response)
  return response;
}

export async function userRegisterAsCustomer(data, token) {
  console.log(token)
  let response = await fetch(`http://54.179.42.252:8080/api/v1/customer/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  });
  // console.log(response)
  return response;
}
