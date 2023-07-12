import http from "./httpServices";

const apiUrlEndPoints = "http://localhost:2001" + "/users";

export function registerUser(user) {
  return http.post(apiUrlEndPoints, {
    name: user.name.firstname + " " + user.name.secondname,
    email: user.email,
    password: user.password,
  });
}

export function getUsers() {
  return http.get(apiUrlEndPoints);
}
export default {
  registerUser,
  getUsers,
};
