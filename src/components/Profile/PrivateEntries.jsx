import React, { useState, useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import EntriesView from "../Entries/EntriesView";
import LoadMoreButton from "../commons/LoadMoreButton";
import { Store } from "../../Store";

const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const PrivateEntries = () => {
  const url = "http://127.0.0.1:9000/api/entry/private";
  const { state, dispatch } = useContext(Store);
  const [pageNumber, setPageNumber] = useState(1);
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}?page=${pageNumber}`,
      setHeaderToken
    );
    const { entries, currentPage } = response.data;
    return response.data;
  };
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <main class="entries-container">
        {console.log(data)}
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

export default PrivateEntries;
