import React from "react";
import Image from 'react-graceful-image'
import axios from 'axios';
import useSWR from "swr";
const token = localStorage.getItem('token');
const setHeaderToken = {
  headers: {
      authorization: token
  }
}
const ImageGallery = ({ addImage, toggleGalleryModal, isGalleryPage }) => {
  const url = 'http://127.0.0.1:9000/api/user/gallery';
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
      <div class="modal-body">
        <section className="image-gallery">
          {data.gallery.map(image => {
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
          })}
        </section>
      </div>
    </>
  );
};
export default ImageGallery;
