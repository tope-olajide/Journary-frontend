import React, { useState } from "react";
import useForm from "../CustomHooks/useForm";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import validateUser from "./validateSignUpData";
import handleNetworkError from "../../utils/networkErrorHandler";
import { Store } from "../../Store";
import { Redirect } from "react-router-dom";
import SignUpView from "./SignUpView";
import { ToastContainer, toast } from "react-toastify";
const url = "http://127.0.0.1:9000/api/user/";
const SignUpUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToHomepage, setRedirectToHomepage] = useState(false);
  const { inputs, handleChange } = useForm();
  const { dispatch } = React.useContext(Store);
  const handleFormSubmit = async event => {
    event.preventDefault();
    const validateUserDetails = validateUser(inputs);
    if (validateUserDetails[0] === false) {
      return toast.error(`${validateUserDetails[1]}`, {
        position: "bottom-left"
      });
    }
    try {
      toast.info(`Signing you up...`, {
        position: "bottom-left"
      });
      setIsLoading(true);
      const response = await axios.post(`${url}signup`, inputs);
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.authorization = token;
      toast.success(`Welcome ${inputs.username}`);
      setTimeout(() => {
        setRedirectToHomepage(true);
      }, 1000);
      setIsLoading(false);
      const userData = jsonwebtoken.decode(localStorage.getItem("token"));
      return dispatch({
        type: "SET_CURRENT_USER",
        userData
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage = handleNetworkError(error);
      return toast.error(errorMessage, {
        position: "bottom-left"
      });
    }
  };
  if (redirectToHomepage) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <SignUpView
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        isLoading={isLoading}
      />
      <ToastContainer />
    </>
  );
};
export default SignUpUser;
