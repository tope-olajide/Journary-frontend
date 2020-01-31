import React from 'react'
import MainNavigationBar from '../commons/MainNavigationBar'
import Image from 'react-graceful-image';
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PrivateEntries from './PrivateEntries';
import PublicEntries from './PublicEntries';
import useSWR from 'swr'
const MyProfile = () => {
const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
  const url = "http://127.0.0.1:9000/api/user";
  const fetcher = async (...args) => {
    const response = await axios.get(
      `${args}`,
      setHeaderToken
    );

    return response.data;
  };
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

    return( <>
    <MainNavigationBar />
    <section class="profile-banner"></section>
      <main class="profile-container">
    
    <section class="info-section">
        <Image className="profile-image" src={data.userData[0].user_image_url} />
        <section class="user-info">
        <h3>Temitope David</h3>
        <p>Fullstack Developer</p></section>
        <table>
            <tr>
              <th scope="col"><h4>{data.privateEntriesCount}</h4><p>Public</p></th>
              <th scope="col"><h4>{data.publicEntriesCount}</h4><p>Private</p></th>
              <th scope="col"><h4>{data.totalEntriesCount}</h4><p>Total</p></th>
            </tr>
         </table>
         <button>Edit Profile</button>
    </section>
    
    <section class="tab-section"><Tabs>
    <TabList className="tab-nav">
                <Tab selectedClassName="tab-nav-active">
                  <p>Private Entries</p>
                </Tab>
                <Tab selectedClassName="tab-nav-active">
                  <p>Public Entries</p>
                </Tab>
                <Tab selectedClassName="tab-nav-active">
                  <p>Settings</p>
                </Tab>
              </TabList>
              <TabPanel><PrivateEntries /></TabPanel>
              <TabPanel><PublicEntries /></TabPanel>




       </Tabs>
    </section>
</main>

    </>)
}
export default MyProfile