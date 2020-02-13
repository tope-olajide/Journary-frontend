import React from "react";
import { Store } from "../../Store";
import axios from "axios";
const useSignOut = () => {
  const { dispatch } = React.useContext(Store);
  const signOut = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["authorization"];
    dispatch({
      type: "SET_CURRENT_USER",
      userData: {}
    });
    window.location = "/intro";
  };
  return {
    signOut
  };
};
export default useSignOut;
