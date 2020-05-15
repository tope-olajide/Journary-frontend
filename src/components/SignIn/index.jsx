import React, { useState } from "react";
import jsonwebtoken from "jsonwebtoken";
import axios from "axios";
import handleNetworkError from "../../utils/networkErrorHandler";
import { Store } from "../../Store";
import { ToastContainer, toast } from "react-toastify";
import useForm from "../CustomHooks/useForm";
import SignInView from './SignInView'
const SignIn = () => {
    const url = "http://localhost:8080/api/user/";
    const [isLoading, setIsLoading] = useState(false);
    const { inputs, handleChange } = useForm();
    const { dispatch } = React.useContext(Store);

    const handleFormSubmit = async e => {
        e.preventDefault();
        try {
            toast.info(`Signing you in...`, {
              position: "bottom-left"
            });
            setIsLoading(true);
            const response = await axios.post(`${url}signin`, inputs);
            const { token } = response.data;
            localStorage.setItem("token", token);
            axios.defaults.headers.common.authorization = token
             const userData = jsonwebtoken.decode(localStorage.getItem("token"));
             dispatch({
              type: "SET_CURRENT_USER",
              userData
            });
            toast.success(`Welcome back ${inputs.authName}`);
            setTimeout(() => {
              window.location = "/";
            }, 2000);
            setIsLoading(false);
           
        } catch (error) {
        setIsLoading(false);
        const errorMessage = handleNetworkError(error);
        return toast.error(errorMessage, {
          position: "bottom-left"
        });
      }
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