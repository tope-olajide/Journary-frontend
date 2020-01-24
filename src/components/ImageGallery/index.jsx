import React, {useState, useContext} from 'react'
import MainNavigationBar from '../commons/MainNavigationBar'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Footer from "../commons/Footer"
import ImageGallery from './ImageGallery'
import UploadNewImage from './UploadNewImage'
import useSWR from "swr";
import axios from 'axios';
import {Store} from '../../Store'

const token = localStorage.getItem('token');
const setHeaderToken = {
  headers: {
      authorization: token
  }
}
const Gallery = () => {
    const deleteImage = async (imageId) => {
    const response = await axios.delete(`${url}/${imageId}`, setHeaderToken);
    revalidate()
    console.log(response)
  }
  const url = 'http://127.0.0.1:9000/api/user/gallery';
  const fetcher = async (...args) => {
      const response = await axios.get(`${args}`, setHeaderToken);
      /*const { gallery } = response.data;
       console.log({ gallery })
        dispatch({
          type: 'SET_IMAGE_GALLERY',
          gallery
      }); */ 
      return response.data
  };

  const  { data,revalidate, error }  = useSWR(url, fetcher);

  console.log (data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
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
              <TabPanel><ImageGallery deleteImage={deleteImage} imageGalleries={data.gallery} isGalleryPage={true} /></TabPanel>
              <TabPanel><UploadNewImage /></TabPanel>
       </Tabs><Footer /> </>
       
    )
}
export default Gallery