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
import baseUrl from "../../utils/baseUrl";
const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token,
  },
};

const AllPublicEntries = () => {
  const url = `${baseUrl}/api/entry`;
  const [pageNumber, setPageNumber] = useState(1);
  const [allPublicEntriesData, setAllPublicEntriesData] = useState([]);
  const [totalPublicEntriesData, setTotalPublicEntriesData] = useState(0);
  const fetchNextDate = async () => {
    const nextPage = pageNumber + 1;
    const response = await axios.get(`${url}?page=${nextPage}`, setHeaderToken);
    const { entries, currentPage, totalEntries } = response.data;
    setTotalPublicEntriesData(totalEntries[0].count);
    console.log(entries);
    const updatedEntries = allPublicEntriesData.concat(entries);
    setAllPublicEntriesData(updatedEntries);
    console.log(currentPage);
    console.log(allPublicEntriesData);
  };
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}?page=${pageNumber}`,
      setHeaderToken
    );
    const { entries, currentPage, totalEntries } = response.data;
    console.log(totalEntries[0].count);
    setTotalPublicEntriesData(totalEntries[0].count);
    setAllPublicEntriesData(entries);
    setPageNumber(currentPage);

    console.log(entries);
    return response.data;
  };

  const { data, error } = useSWR(url, fetcher);
  if (error)
    return (
      <div>
        <ErrorPage />
      </div>
    );
  if (!data)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  return (
    <>
      <MainNavigationBar />
      <HeroImage heroImage={diaryImage} heroCaption={"All Public Entries"} />
      <InfiniteScroll
        dataLength={totalPublicEntriesData} //This is important field to render the next data
        next={fetchNextDate}
        hasMore={
          allPublicEntriesData.length == totalPublicEntriesData ? false : true
        }
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <main class="entries-container">
          {
            allPublicEntriesData.map((entry) => {
              return <EntriesView key={entry.id} {...entry} />;
            })
           }
        </main>
      </InfiniteScroll>
      <Footer />
    </>
  );
};
export default AllPublicEntries;
