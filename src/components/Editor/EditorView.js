import React, { useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import imageIcon from "../../images/images.png";
import useImageUpload from "../CustomHooks/useSelectImageUpload";
import EntriesView from "../Entries/EntriesView";
import img1 from "../../images/8.jpeg";
import img2 from "../../images/security.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MainNavigationBar from "../commons/MainNavigationBar"
import dompurify from 'dompurify';
import useEditor from '../CustomHooks/useEditor'
import { Store } from "../../Store";
import { EditorState, AtomicBlockUtils } from 'draft-js';
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  justifyContent: "center"
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};
const useToggleImageUpload = () => {
  const { dispatch } = useContext(Store);
  const dispatchToggleUpload = () => {
    return dispatch({
      type: "TOGGLE_UPLOAD_MODAL"
    });
  };

  return {
    dispatchToggleUpload
  };
};
const UploadImage = (props) => {
  const { dispatchToggleUpload } = useToggleImageUpload();
  const { state } = useContext(Store);
  const toggleUploadView = () => {
    return dispatchToggleUpload();
  };
  const addImage = (imageUrl) => {
    const { editorState, onChange } = props;
    const urlValue = imageUrl
    const contentStateWithEntity=editorState.getCurrentContent().createEntity('IMAGE', 'IMMUTABLE', { src: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity },);
    newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState,entityKey,' ',);
    onChange(newEditorState)
  };
  if (state.displayUploadModal){
return (
  <>
 <ImageUploadGallery addImage={addImage} dispatchToggleUpload={dispatchToggleUpload}/> 
  </>
)
  }
  return (
    <>
      <div className="image-icon-container" onClick={toggleUploadView}>
        <img className="image-icon" src={imageIcon} alt={imageIcon} />
      </div>
    </>
  );
};
const ImageUploadGallery = ({addImage}) => {
  const { getRootProps, getInputProps, files } = useImageUpload();
  const { dispatchToggleUpload } = useToggleImageUpload();
  const toggleUploadView = () => {
    return dispatchToggleUpload();
  };
  const selectImageForEditor = imageUrl => {
    addImage(imageUrl);
    dispatchToggleUpload()
  };
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={""} />
      </div>
    </div>
  ));
  return (
    <>
      <Tabs>
        <section className="editor-image-modal"  >
          <section className="modal-header">
            <span onClick={toggleUploadView} className="close">&times;</span>
            <TabList className="tab-nav">
              <Tab selectedClassName="tab-nav-active">
                <p>Image Gallery</p>
              </Tab>
              <Tab selectedClassName="tab-nav-active">
                <p>Upload New</p>
              </Tab>
            </TabList>
          </section>
          <div class="modal-body">
            <TabPanel>
              <section className="image-gallery">
                <main>
                  <img src={img1} alt={img1} />
                  <button onClick={() =>selectImageForEditor('https://res.cloudinary.com/temitope/image/upload/v1557074023/gcv7rbem66pj1uobhh1q.jpg')} className="fit">Select</button>
                </main>
                <main>
                  <img src={img2} alt={img2} />
                  <button className="fit">Select</button>
                </main>
                <main>
                  <img src={img2} alt={img2} />
                  <button className="fit">Select</button>
                </main>
                <main>
                  <img src={img2} alt={img2} />
                  <button className="fit">Select</button>
                </main>
                <main>
                  <img src={img1} alt={img1} />
                  <button className="fit">Select</button>
                </main>
                <main>
                  <img src={img2} alt={img2} />
                  <button className="fit">Select</button>
                </main>
                <main>
                  <img src={img2} alt={img2} />
                  <button className="fit">Select</button>
                </main>
                <main>
                  <img src={img2} alt={img2} />
                  <button className="fit">Select</button>
                </main>
              </section>
            </TabPanel>
            <TabPanel>
              <aside style={thumbsContainer}>{thumbs}</aside>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <div className="upload-info-container">
                  <h3>Drag 'n' drop pictures here</h3> <h3> or </h3>
                  <h3>click to select files</h3>
                </div>
              </div>
              <div className="center">
                <button>Upload Image</button>
              </div>
            </TabPanel>
          </div>
        </section>
      </Tabs>
    </>
  );
};

const EditorView = () => {
  const {onEditorStateChange, editorState, html} = useEditor()
  const sanitizer = dompurify.sanitize;

  return (
  <>
    <section className="editor-container">
      <Editor
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        toolbar={{
          /* inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true }, history: { inDropdown: true },*/
          image: { className: 'hide-default-image-icon' },
          
        }}
        toolbarCustomButtons={[<UploadImage />]}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </section>
    
    <div
          style={{ minHeight: "200px" }}
          dangerouslySetInnerHTML={{ __html: sanitizer(html) }}
        />
  </>
)};
export default EditorView;
