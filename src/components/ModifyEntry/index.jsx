import React, { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import useSWR from "swr";
import EditorView from "../Editor/EditorView";
import MainNavigationBar from "../commons/MainNavigationBar";
import ImageGalleryUploadModal from "../Editor/ImageGalleryUploadModal";
import useEditor from "../CustomHooks/useEditor";
import useForm from "../CustomHooks/useForm";
import useToggleImageGallery from "../CustomHooks/useToggleImageGallery";
import handleNetworkError from "../../utils/networkErrorHandler";
import { ToastContainer, toast } from "react-toastify";
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage";
import Footer from "../commons/Footer";
import baseUrl from "../../utils/baseUrl";
const ModifyEntry = ({ match }) => {
  const { entryId } = match.params;
  const [featureImage, setFeatureImage] = useState("");
  const [isFeatureImage, setIsFeatureImage] = useState(false);
  const { inputs, handleChange } = useForm();
  const {
    htmlContents,
    onEditorStateChange,
    editorState,
    setEditorState,
  } = useEditor();
  const { toggleGalleryModal, isGalleryModal } = useToggleImageGallery();

  const [isLoading, setIsLoading] = useState(false);
  const [isEntryPrivate, setIsEntryPrivate] = useState(true);
  const token = localStorage.getItem("token");

  const setHeaderToken = {
    headers: {
      authorization: token,
    },
  };
  const addImage = (imageUrl) => {
    setFeatureImage(imageUrl);
  };
  const toggleFeatureImage = () => {
    return setIsFeatureImage(!isFeatureImage);
  };
  /*   const onEditorStateChange = editorState => {
    setEditorState(editorState);

  }; */
  const updateEntry = async () => {
    const title = inputs.title || data.entry.title;
    const isPrivate = isEntryPrivate;
    const content = htmlContents || data.entry.content;
    const featureImageUrl = featureImage;
    const { entryId } = match.params;
    console.log({ title, isPrivate, content, featureImageUrl });

    const url = `${baseUrl}/api/entry/${entryId}`;
    try {
      setIsLoading(true);
      toast.info(`Updating entry...`, {
        position: "top-center",
      });
      await axios.put(
        `${url}`,
        { title, isPrivate, content, featureImageUrl },
        setHeaderToken
      );

      toast.success(` Entry Updated Successfully!`, {
        position: "top-center",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = handleNetworkError(error);
      return toast.error(errorMessage, {
        position: "bottom-left",
      });
    } /* */
  };
  const handleSelectChange = (event) => {
    setIsEntryPrivate(event.target.value);
  };
  const url = `${baseUrl}/api/entry/get-entry/${entryId}`;
  const fetcher = async (...args) => {
    const response = await axios.get(`${args}`, setHeaderToken);
    const defaultContent = response.data.entry;
    console.log(defaultContent);
    const contentBlock = htmlToDraft(defaultContent.content);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const updatedEditorState = EditorState.createWithContent(contentState);
    setEditorState(updatedEditorState);
    setIsEntryPrivate(defaultContent.is_private);
    setFeatureImage(defaultContent.entry_image_url);
    return response.data;
  };
  const { data, error } = useSWR(url, fetcher);
  if (error)
    return (
      <>
        <ErrorPage />
      </>
    );
  if (!data)
    return (
      <>
        <LoadingPage />
      </>
    );
  console.log(data);

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
          defaultValue={data.entry.title}
        />
        <select value={isEntryPrivate} onChange={handleSelectChange}>
          <option value="true">Private</option>
          <option value="false">Public</option>
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
        <button onClick={updateEntry} className="mt-2 fit primary">
          {isLoading ? "Updating..." : "Modify Entry"}
        </button>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};
export default ModifyEntry;
