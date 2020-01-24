import React from "react";
import Image from 'react-graceful-image'
import axios from 'axios';
const ImageGallery = ({imageGalleries,deleteImage, addImage, toggleGalleryModal, isGalleryPage }) => {
  const url = 'http://127.0.0.1:9000/api/user/gallery';
  const selectImageForEditor = imageUrl => {
    addImage(imageUrl);
    toggleGalleryModal();
  };
  const onImageDeleteImage = async imageId => {
    deleteImage(imageId)
     console.log(imageId);
/*    const response = await axios.get(`${url}/${imageId}`, setHeaderToken); */

  };


  return (
    <>
      <div class="modal-body">
        <section className="image-gallery">
          {imageGalleries.map(image => {
            return (
              <main>
                <Image src={image.image_url} alt={image.image_url} />
                {isGalleryPage ? (
                  <button
                    onClick={() => onImageDeleteImage(image.gallery_id)}
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
