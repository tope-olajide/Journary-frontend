import React from "react";
import Image from 'react-graceful-image'
import axios from 'axios';
import useSWR from "swr";
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage/ErrorPageView";

const token = localStorage.getItem('token');
const setHeaderToken = {
  headers: {
      authorization: token
  }
}
const ImageGallery = ({ addImage, toggleGalleryModal, isGalleryPage }) => {
  const url = 'https://journary.herokuapp.com/api/user/gallery';
  const deleteImage = async (imageId) => {
    const response = await axios.delete(`${url}/${imageId}`, setHeaderToken);
    revalidate()
    console.log(response)
  }
  const selectImageForEditor = imageUrl => {
    addImage(imageUrl);
    toggleGalleryModal();
  };
  const onImageDelete = async imageId => {
    deleteImage(imageId)
     console.log(imageId);
  };
  const fetcher = async (...args) => {
      const response = await axios.get(`${args}`, setHeaderToken);
      const { gallery } = response.data;
       console.log({ gallery })
       /* dispatch({
          type: 'SET_IMAGE_GALLERY',
          gallery
      }); */ 
      return response.data
  };

  const  { data,revalidate, error }  = useSWR(url, fetcher);
  if (error)
    return (
      <>
        <div><ErrorPage /></div>
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
      <div class="modal-body">
        <section className="image-gallery">
           
          {(data.gallery.length)?data.gallery.map(image => {
            return (
              <main>
                <Image src={image.image_url} alt={image.image_url} />
                {isGalleryPage ? (
                  <button
                    onClick={() => onImageDelete(image.gallery_id)}
                    className="fit">
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => selectImageForEditor(image.image_url)}
                    className="fit">
                    Select
                  </button>
                ) }
              </main>
            );
          }):<div className="no-entry">
          <h1>
            No images were found in your gallery.
            <br /> Select 'Upload New' tab to upload new pictures.
          </h1>
        </div>}

        </section>
      </div>
    </>
  );
};
export default ImageGallery;
