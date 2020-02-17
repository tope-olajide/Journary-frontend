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
      console.log(token)
      if (!token) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["authorization"];
        dispatch({
          type: "SET_CURRENT_USER",
          userData: {}
        });
        window.location = "/intro";
      } else if (token) {
        console.log(process.env.JWT_SECRET)
        jsonwebtoken.verify(token, process.env.JWT_SECRET||"77ic##$8ngn", (error, decoded) => {
          if (error || decoded.expiresIn < new Date().getTime() / 1000) {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["authorization"];
            dispatch({
              type: "SET_CURRENT_USER",
              userData: {}
            });
            window.location = "/intro";
          }
        });
      }
    },[]);

        return (
          <ChildComponent {...props} />
        );
    }
  
  
    return Authenticate;
  }
  
