import React, { useState } from "react";
import jsonwebtoken from "jsonwebtoken";
import axios from "axios";
import { Redirect } from "react-router-dom";
import handleNetworkError from "../../utils/networkErrorHandler";
import { Store } from "../../Store";
import { ToastContainer, toast } from "react-toastify";
import useForm from "../CustomHooks/useForm";
import SignInView from './SignInView'
const SignIn = () => {
    const url = "http://127.0.0.1:9000/api/user/";
    const [isLoading, setIsLoading] = useState(false);
    const { inputs, handleChange } = useForm();
    const { dispatch } = React.useContext(Store);
    const [redirectToHomepage, setRedirectToHomepage] = useState(false);
    const handleFormSubmit = async e => {
        e.preventDefault();
        try {
            toast.info(`Signing you up...`, {
              position: "bottom-left"
            });
            setIsLoading(true);
            const response = await axios.post(`${url}signin`, inputs);
            const { token } = response.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common.authorization = token;
            toast.success(`Welcome back ${inputs.authName}`);
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
    }
    if (redirectToHomepage) {
      return <Redirect to="/" />;
    }
    return (
        <>
<SignInView 
handleFormSubmit={handleFormSubmit}
handleChange={handleChange}
isLoading={isLoading}
/><ToastContainer />
        </>
    )
}
export default SignIn