import { useState } from "react";
const useToggleImageGallery = () => {
  const [isGalleryModal, setIsGalleryModal] = useState(false);
  const toggleGalleryModal = () => {
    return setIsGalleryModal(!isGalleryModal)
  }
    return {
      toggleGalleryModal, isGalleryModal
    };
  };
  export default useToggleImageGallery