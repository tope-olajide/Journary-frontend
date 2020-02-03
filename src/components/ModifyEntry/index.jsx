import React, { useContext, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios'
import useSWR from 'swr'
import EditorView from "../Editor/EditorView";
import MainNavigationBar from "../commons/MainNavigationBar";
import ImageGalleryUploadModal from "../Editor/ImageGalleryUploadModal";
import { Store } from "../../Store";
import useEditor from "../CustomHooks/useEditor";
import useForm from "../CustomHooks/useForm";
import useToggleImageGallery from "../CustomHooks/useToggleImageGallery";
import handleNetworkError from "../../utils/networkErrorHandler";
import { ToastContainer, toast } from "react-toastify";
const ModifyEntry = ({match}) => {
const {entryId} = match.params
const { state } = useContext(Store);
const [featureImage, setFeatureImage] = useState("");
const [isFeatureImage, setIsFeatureImage] = useState(false);
const { inputs, handleChange } = useForm();
const {  htmlContents, onEditorStateChange, editorState,setEditorState } = useEditor();
/* const [htmlContents, setHtmlContents] = useState(""); */
const { toggleGalleryModal, isGalleryModal } = useToggleImageGallery();
const [isLoading, setIsLoading] = useState(false);
const [isEntryPrivate, setIsEntryPrivate] = useState(true);
const { dispatch } = React.useContext(Store);
/* const [editorState, setEditorState] = useState(""); */
const token = localStorage.getItem('token');
const setHeaderToken = {
    headers: {
        authorization: token
    }
}
const addImage = imageUrl => {
    setFeatureImage(imageUrl);
  };
  const toggleFeatureImage = () => {
    return setIsFeatureImage(!isFeatureImage);
  };
/*   const onEditorStateChange = editorState => {
    setEditorState(editorState);

  }; */
  const updateEntry = async () => {
      const title = inputs.title || data.entry[0].title;
      const isPrivate = isEntryPrivate;
      const content = htmlContents || data.entry[0].content;
      const featureImageUrl = featureImage
      const {entryId} = match.params
      console.log({title,isPrivate,content,featureImageUrl });
      
     const url = `http://127.0.0.1:9000/api/entry/${entryId}`;
    try {
        setIsLoading (true);
        toast.info(`Updating entry...`, {
            position: "bottom-left"
          });
           await axios.put(`${url}`, {title,isPrivate,content,featureImageUrl },setHeaderToken);
          
        toast.success(` Entry Updated Successfully!`, {
          position: "top-center"
        })
        setIsLoading (false);
    }
    catch (error) {
      setIsLoading(false);
      const errorMessage = handleNetworkError(error);
      return toast.error(errorMessage, {
        position: "bottom-left"
      });
    }/* */
  };
  const handleSelectChange=(event)=> {
    setIsEntryPrivate(event.target.value);
  }
const url = `http://127.0.0.1:9000/api/entry/get-entry/${entryId}`;
const fetcher = async (...args) => {
const response = await axios.get(`${args}`,setHeaderToken);
const defaultContent = response.data.entry;
    console.log(defaultContent )
const contentBlock = htmlToDraft(defaultContent[0].content);
const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
const updatedEditorState = EditorState.createWithContent(contentState);
setEditorState(updatedEditorState);
setIsEntryPrivate(defaultContent[0].is_private);
setFeatureImage(defaultContent[0].entry_image_url);
    return response.data
};
const  { data, error }  = useSWR(url, fetcher);
if (error) return <div>failed to load</div>
if (!data) return <div>loading...</div>
console.log(data.entry[0].content)

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
          defaultValue = {data.entry[0].title}
        />
<select value={isEntryPrivate} onChange={handleSelectChange}>
  <option value="true" >Private</option>
  <option value="false" >Public</option>
</select>
        <section className="add-feature-image-section">
          <button className="fit primary mt-1" onClick={toggleFeatureImage}>
            <span>Add Feature Image</span>
          </button>
          <div
            onClick={toggleGalleryModal}
            className="feature-image-section"
            style={isFeatureImage ? {} : { border: 0, height: 0 }}
          >
            { featureImage ? (
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
        <button onClick={updateEntry} className="fit primary">
          {isLoading ? "Updating..." : "Modify Entry"}
        </button>
      </section>
      <ToastContainer />
    </>
  );
}
export default ModifyEntry