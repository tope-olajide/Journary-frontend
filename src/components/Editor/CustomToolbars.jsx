import React, { useContext } from "react";
import { EditorState, AtomicBlockUtils } from "draft-js";
import imageIcon from "../../images/images.png";
import  ImageGalleryUploadModal  from "./ImageGalleryUploadModal";
import useToggleImageGallery from "../CustomHooks/useToggleImageGallery";
import { Store } from "../../Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomToolbars = props => {
  const { state, dispatch } = useContext(Store);
  const { toggleGalleryModal, isGalleryModal } = useToggleImageGallery()
  const addImage = imageUrl => {
/* this will use the first picture that the user select as the Featured Image,
the user can later change it when he/she click on the "Set as feature" button */
dispatch({
  type: "SET_TEMPORARY_FEATURE_IMAGE",
  payLoad: imageUrl
});
console.log(state.temporaryFeatureImage)
// Insert the selected image into the editor
    const { editorState, onChange } = props;
    const urlValue = imageUrl;
    const contentStateWithEntity = editorState
      .getCurrentContent()
      .createEntity("IMAGE", "IMMUTABLE", { src: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    );
    onChange(newEditorState);
  // Close Image Gallery when done
  toggleGalleryModal()
  };
  const toggleEditorSize =() =>{
    dispatch({
      type: "TOGGLE_EDITOR_SIZE",
      payload: !state.maximizeEditor
    });
  }
  if (isGalleryModal) {
    return (
      <>
        <ImageGalleryUploadModal
          addImage={addImage}
          toggleGalleryModal={toggleGalleryModal}
        />
      </>
    );
  }
  return (
    <>
      <div className="image-icon-container" onClick={toggleGalleryModal}>
        <img className="image-icon" src={imageIcon} alt={imageIcon} />
      </div>
      <FontAwesomeIcon  className="image-icon" icon={state.maximizeEditor?"window-minimize":"window-maximize"} onClick={toggleEditorSize}/>
    </>
  );
};
export default CustomToolbars;
