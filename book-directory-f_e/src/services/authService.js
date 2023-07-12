import jwtDecode from "jwt-decode";
import http from "./httpServices";

const apiUrlEndPoints = "http://localhost:2001" + "/auth";
const tokenkey = "token";

http.setJwt(getJwt());

export async function loginWithToken(jwt) {
  return localStorage.setItem(tokenkey, jwt);
}

export async function loginUser(email, password) {
  const { data: jwt } = await http.post(apiUrlEndPoints + "/login", {
    email,
    password,
  });
  localStorage.setItem(tokenkey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenkey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenkey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(tokenkey);
}
export default {
  loginWithToken,
  loginUser,
  getCurrentUser,
  logoutUser,
};
