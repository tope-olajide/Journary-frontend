import { Link } from "react-router-dom";
import React from 'react'
import MainNavigationBar from '../commons/MainNavigationBar'
import Image from 'react-graceful-image';
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PrivateEntries from './PrivateEntries';
import PublicEntries from './PublicEntries';
import useSWR from 'swr'
import Reminder from '../Reminder'
import Footer from '../commons/Footer'
import BookDiaryPen from '../../images/Book-Diary-Pen.jpg'
import HeroImage from '../commons/HeroImage'
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage";
const MyProfile = () => {
const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
  const url = "http://localhost:8080/api/user";
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}`,
      setHeaderToken
    );

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

    return( <>
    <MainNavigationBar />
    {console.log(data.userData[0])}
    <HeroImage heroImage={BookDiaryPen} heroCaption={"My Profile"} />
    <main class="profile-container">
    <section class="info-section">
        <Image className="profile-image" src={data.userData[0].user_image_url} />
        <section class="user-info">
        <h3>{data.userData[0].fullname}</h3>
        <p>{data.userData[0].about}</p></section>
        <table>
            <tr>
              <th scope="col"><h4>{data.privateEntriesCount}</h4><p>Public</p></th>
              <th scope="col"><h4>{data.publicEntriesCount}</h4><p>Private</p></th>
              <th scope="col"><h4>{data.totalEntriesCount}</h4><p>Total</p></th>
            </tr>
        </table>
        <div className="center mt-1">
        <Link to="/edit-profile"><button>Edit Profile</button></Link></div>
    </section> 
    <section class="tab-section"><Tabs>
    <TabList className="tab-nav profile-tab-nav">
                <Tab selectedClassName="tab-nav-active">
                  <p>Private Entries</p>
                </Tab>
                <Tab selectedClassName="tab-nav-active">
                  <p>Public Entries</p>
                </Tab>
              <Tab selectedClassName="tab-nav-active">
                  <p>Reminder</p>
              </Tab>
              </TabList>
              <TabPanel><PrivateEntries /></TabPanel>
              <TabPanel><PublicEntries /></TabPanel>
              <TabPanel><Reminder /></TabPanel>
              </Tabs>
    </section>
</main>
<Footer />
    </>)
}
export default MyProfile