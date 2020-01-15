import React, { useContext } from "react";
import { EditorState, AtomicBlockUtils } from "draft-js";
import imageIcon from "../../images/images.png";
import  ImageGalleryUploadModal  from "./ImageGalleryUploadModal";
import useToggleImageUpload from "../CustomHooks/useToggleImageUpload";
import { Store } from "../../Store";

const CustomImageToolbar = props => {
  const { dispatchToggleUpload } = useToggleImageUpload();
  const { state } = useContext(Store);
  const toggleUploadView = () => {
    return dispatchToggleUpload();
  };
  const addImage = imageUrl => {
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
  };
  if (state.displayUploadModal) {
    return (
      <>
        <ImageGalleryUploadModal
          addImage={addImage}
          dispatchToggleUpload={dispatchToggleUpload}
        />
      </>
    );
  }
  return (
    <>
      <div className="image-icon-container" onClick={toggleUploadView}>
        <img className="image-icon" src={imageIcon} alt={imageIcon} />
      </div>
    </>
  );
};
export default CustomImageToolbar;
