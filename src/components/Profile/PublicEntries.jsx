import React, { useState, useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import EntriesView from "../Entries/EntriesView";
import LoadingPage from "../commons/LoadingPage/LoadingView";
import ErrorPage from "../commons/ErrorPage/ErrorPageView";
import baseUrl from "../../utils/baseUrl";

const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const PublicEntries = () => {
  const url = `${baseUrl}/api/entry/public`;
  const [pageNumber, setPageNumber] = useState(1);
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}?page=${pageNumber}`,
      setHeaderToken
    );
    return response.data;
  };
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div><ErrorPage /></div>;
  if (!data) return <div><LoadingPage /></div>;
  return (
    <>
      <main class="entries-container">
        {!(data.entries.length)?<div className="no-entry"><h1>You do not have any private entries yet.<br /> When you do, they will appear here.</h1></div>:
        data.entries.map(entry => {
          return (
            <EntriesView key={entry.id} {...entry}
            />
          );
        })}
      </main>
    </>
  );
};

export default PublicEntries;
