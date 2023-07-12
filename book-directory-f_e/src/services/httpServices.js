import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    console.log("un expected errors", error);
    toast.error("un expected errors");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["authorization"] = jwt;
}
export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
