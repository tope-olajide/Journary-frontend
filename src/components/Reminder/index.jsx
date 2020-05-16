import React, { useState } from "react";
import ReminderView from './ReminderView'
import axios from "axios";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import handleNetworkError from "../../utils/networkErrorHandler";
import LoadingPage from "../commons/LoadingPage";
import baseUrl from "../../utils/baseUrl";
import ErrorPage from "../commons/ErrorPage";
const token = localStorage.getItem("token");

const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const Reminder = () => {
    const [time, setTime] = useState("");
    const [isRunning, setIsRunning] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const setReminder = time => {
      setTime(time);
      console.log(time);
    };
    const saveReminder= async ()=> {
      if(time === "Off") {
        setIsRunning (false)
      } else {
        setIsRunning (true)
      }
      console.log(isRunning)
      console.log({time,isRunning})
        try {
            const url = `${baseUrl}/api/user/set-reminder`;
            setIsloading(true)
            await axios.post(`${url}`, {time,isRunning}, setHeaderToken);
            setIsloading(false)
            toast.success(`Reminder set successfully`);
                    setTimeout(() => {
                    }, 3000);
                }
                catch (error) {
                    const errorMessage = handleNetworkError(error);
                    setIsloading(false)
                    return toast.error(errorMessage, {
                      position: "bottom-left"
                    });
                    
                  }
    }
    const fetcher = async (...args) => {
        const response = await axios.get(`${args}`, setHeaderToken);
        console.log (response.data.reminder)
        setTime (response.data.reminder)
        if (response.data.reminder === "Off") {
          setIsRunning (false);
        } else {
          setIsRunning (true);
        }
        return response.data;
      };
    const url = `${baseUrl}/api/user/get-reminder`;
    const { data, error } = useSWR(url, fetcher);
    if (error)
    return (
      <>
        <ErrorPage />
      </>
    );
  if (!data)
    return (
      <>
        <LoadingPage />
      </>
    );
 return (
     <>
     <ReminderView setReminder={setReminder} time={time} saveReminder={saveReminder} isLoading={isLoading}/>
     <ToastContainer />
     </>
 )
};
export default Reminder;
