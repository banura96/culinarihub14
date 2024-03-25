import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token || null;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkOutLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
  return null;
}
