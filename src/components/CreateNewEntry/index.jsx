import React, { useContext, useState } from "react";
import EditorView from "../Editor/EditorView";
import MainNavigationBar from "../commons/MainNavigationBar";
import ImageGalleryUploadModal from "../Editor/ImageGalleryUploadModal";
import { Store } from "../../Store";
import useEditor from "../CustomHooks/useEditor";
import useForm from "../CustomHooks/useForm";
import useToggleImageGallery from "../CustomHooks/useToggleImageGallery";
import handleNetworkError from "../../utils/networkErrorHandler";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../commons/Footer";
import axios from "axios";
import baseUrl from '../../utils/baseUrl'
const CreateNew = () => {
  const { state } = useContext(Store);
  const [featureImage, setFeatureImage] = useState("");
  const [isFeatureImage, setIsFeatureImage] = useState(false);
  const { inputs, handleChange } = useForm();
  const { onEditorStateChange, editorState, htmlContents } = useEditor();
  const { toggleGalleryModal, isGalleryModal } = useToggleImageGallery();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = React.useContext(Store);

  const addImage = imageUrl => {
    setFeatureImage(imageUrl);
  };
  const toggleFeatureImage = () => {
    return setIsFeatureImage(!isFeatureImage);
  };
  const saveEntry = async () => {
    const url = `${baseUrl}/api/entry`;
    const content = htmlContents;
    const title = inputs.title;
    const featureImageUrl = featureImage || state.temporaryFeatureImage;
    const token = localStorage.getItem('token');
const setHeaderToken = {
    headers: {
        authorization: token
    }
}
    try {
      setIsLoading(true);
      toast.info(`Saving entry...`, {
        position: "bottom-left"
      });
      const response = await axios.post(`${url}`, {
        content,
        title,
        featureImageUrl
      },setHeaderToken);
      const { entry } = response.data;
      dispatch({
        type: "ADD_ENTRY",
        entry
      });
      toast.success(`Diary Entry Added Successfully!`, {
        position: "bottom-left"
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = handleNetworkError(error);
      return toast.error(errorMessage, {
        position: "bottom-left"
      });
    }
  };

  return (
    <>
      <MainNavigationBar />
      {isGalleryModal ? (
        <ImageGalleryUploadModal
          addImage={addImage}
          toggleGalleryModal={toggleGalleryModal}
        />
      ) : null}
      <section className="entry-container">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="entry-title_text-box"
          onChange={handleChange}
        />
        <section className="add-feature-image-section">
          <button className="fit primary" onClick={toggleFeatureImage}>
            <span>Add Feature Image</span>
          </button>
          <div
            onClick={toggleGalleryModal}
            className="feature-image-section"
            style={isFeatureImage ? {} : { border: 0, height: 0 }}
          >
            {featureImage ? (
              <img src={featureImage} alt={featureImage} />
            ) : (
              <p style={isFeatureImage ? {} : { display: "none" }}>
                Click here to Select your feature image
              </p>
            )}
          </div>
        </section>
        <EditorView
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <div className="center"><button onClick={saveEntry} className="  primary fit mt-1">
          {isLoading ? "Saving..." : "Save"}
        </button></div>
      </section>
      <Footer />
      <ToastContainer />
    </>
  );
};
export default CreateNew;
