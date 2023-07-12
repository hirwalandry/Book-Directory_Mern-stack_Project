import http from "./httpServices";

const apiEndPoint = "http://localhost:2001" + "/requests";

export function createRequest(request) {
  return http.post(apiEndPoint, request);
}

export function getRequests() {
  return http.get(apiEndPoint);
}
export default {
  createRequest,
  getRequests,
};
