import React, { useEffect } from "react";
import auth from "../services/authService";

function Logout(props) {
  useEffect(() => {
    auth.logoutUser();

    window.location = "/";
  });
  return null;
}

export default Logout;
