import React, { useState, useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import EntriesView from "./EntriesView";
import HeroImage from "../commons/HeroImage";
import { Store } from "../../Store";
import MainNavigationBar from "../commons/MainNavigationBar";
import Footer from "../commons/Footer";
import InfiniteScroll from "react-infinite-scroll-component";
import diaryImage from "../../images/diary.jpg";
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage";
const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};

const AllPublicEntries = () => {
  const url = "https://journary.herokuapp.com/api/entry";
  const { state, dispatch } = useContext(Store);
  const [pageNumber, setPageNumber] = useState(1);
  const fetchNextDate = async () => {
    const nextPage = pageNumber + 1;
    const response = await axios.get(`${url}?page=${nextPage}`, setHeaderToken);
    const { entries, currentPage } = response.data;
    setPageNumber(currentPage);
    console.log({ entries, currentPage });
    dispatch({
      type: "FETCH_ALL_PUBLIC_ENTRIES",
      entries,
      currentPage
    });
    console.log(state.entries);
  };
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}?page=${pageNumber}`,
      setHeaderToken
    );
    const { entries, currentPage } = response.data;
    setPageNumber(currentPage);
    console.log({ entries, currentPage });
    dispatch({
      type: "FETCH_ALL_PUBLIC_ENTRIES",
      entries,
      currentPage
    });
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
      <MainNavigationBar />
      <HeroImage heroImage={diaryImage} heroCaption={"All Public Entries"} />
      <InfiniteScroll
        dataLength={state.entries.length} //This is important field to render the next data
        next={fetchNextDate}
        hasMore={true}
      >
        <main class="entries-container">
          {state.entries.map(entry => {
            return <EntriesView key={entry.id} {...entry} />;
          })}
        </main>
      </InfiniteScroll>
      <Footer />
    </>
  );
};
export default AllPublicEntries;
