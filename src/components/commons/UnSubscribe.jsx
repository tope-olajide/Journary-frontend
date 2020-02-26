import React from 'react'
import LoadingPage from './LoadingPage'
import axios from "axios";
import useSWR from "swr";
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage'

const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const UnSubscribe = ({ match }) => {
    const { email } = match.params;
    const url = `http://127.0.0.1:5000/api/user/unsubscribe/${email}`;
    const fetcher = async (...args) => {
        const response = await axios.get(`${args}`, setHeaderToken);
        console.log(response)
        return response.data;
      };
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
        <section className="error-page-container">
        <section>
            
        </section>
        <h1>{data.message} </h1>
        <Link to="/"><button> Back to Homepage</button></Link></section>
        </>

    )
}
export default UnSubscribe