import React, { useState } from "react";
import ReminderView from './ReminderView'
import axios from "axios";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import handleNetworkError from "../../utils/networkErrorHandler";
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage";
const token = localStorage.getItem("token");

const setHeaderToken = {
  headers: {
    authorization: token
  }
};


const Reminder = () => {
    const [schedule, setSchedule] = useState("" );
    const setReminder = schedule => {
      setSchedule(schedule);
      console.log(schedule);
    };
    const saveReminder= async ()=> {
        try {
            const url = `http://127.0.0.1:9000/api/user/set-reminder`;
            await axios.post(`${url}`, {schedule}, setHeaderToken);
            toast.success(`Reminder set successfully`);
                    setTimeout(() => {
                    }, 3000);
                }
                catch (error) {
                    const errorMessage = handleNetworkError(error);
                    return toast.error(errorMessage, {
                      position: "bottom-left"
                    });
                  }
    }
    const fetcher = async (...args) => {
        const response = await axios.get(`${args}`, setHeaderToken);
        console.log(response.data.reminder)
        setSchedule(response.data.reminder)
        return response.data;
      };
      const url = `http://127.0.0.1:9000/api/user/get-reminder`;
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
     <ReminderView setReminder={setReminder} schedule={schedule} saveReminder={saveReminder} />
     <ToastContainer />
     </>
 )
};
export default Reminder;
