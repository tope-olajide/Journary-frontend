import React, { useState, useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import EntriesView from "../Entries/EntriesView";

const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const PublicEntries = () => {
  const url = "https://journary.cleverapps.io/api/entry/public";
  const [pageNumber, setPageNumber] = useState(1);
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}?page=${pageNumber}`,
      setHeaderToken
    );
    return response.data;
  };
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
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
