import React, { useEffect } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Store } from "../Store";
import axios from "axios";
require("dotenv").config();

export default function ValidateUser(ChildComponent) {
    const Authenticate = (props)=> {
        const { dispatch } = React.useContext(Store);
        useEffect(() => {
      const token = localStorage.getItem("token");
      const decoded = jsonwebtoken.decode(token);
      if (!token || !decoded) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["authorization"];
        dispatch({
          type: "SET_CURRENT_USER",
          userData: {}
        });
        window.location = "/intro";
      } 
        if (decoded.exp < new Date().getTime() / 1000) {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["authorization"];
            dispatch({
              type: "SET_CURRENT_USER",
              userData: {}
            });
            window.location = "/intro";
          }
      
    },[]);

        return (
          <ChildComponent {...props} />
        );
    }
  
  
    return Authenticate;
  }
  
