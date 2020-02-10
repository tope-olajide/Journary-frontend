import React from 'react'
import MainNavigationBar from '../commons/MainNavigationBar'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Footer from "../commons/Footer"
import ImageGallery from './ImageGallery'
import UploadNewImage from './UploadNewImage';

const Gallery = () => {

    return (
        <>
        <MainNavigationBar />
        <Tabs>
        <TabList className="tab-nav">
                <Tab selectedClassName="tab-nav-active">
                  <p>Image Gallery</p>
                </Tab>
                <Tab selectedClassName="tab-nav-active">
                  <p>Upload New</p>
                </Tab>
              </TabList>
              <TabPanel><ImageGallery isGalleryPage={true} /></TabPanel>
              <TabPanel><UploadNewImage /></TabPanel>
       </Tabs><Footer /> </>
       
    )
}
export default Gallery