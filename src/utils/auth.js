import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token || null;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkOutLoader() {
  console.log('loader')
  const token = getAuthToken();
  console.log('loader toke', token)


  if (!token) {
    console.log('loader toke redirect', token)

    return redirect("/login");
  }
  return null;
}
