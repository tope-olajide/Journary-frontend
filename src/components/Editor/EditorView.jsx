import React, { useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import useImageUpload from "../CustomHooks/useImageUpload";
import EntriesView from "../Entries/EntriesView";
import MainNavigationBar from "../commons/MainNavigationBar"
import dompurify from 'dompurify';
import useEditor from '../CustomHooks/useEditor'
import CustomImageToolbar from './CustomImageToolbar'

const EditorView = ({onEditorStateChange, editorState, defaultEditorState}) => {
  /* const {onEditorStateChange, editorState} = useEditor()  */
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
        toolbarCustomButtons={[<CustomImageToolbar />]}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        defaultEditorState={defaultEditorState}
      />
    </section>
    
{/*     <div
          style={{ minHeight: "200px" }}
          dangerouslySetInnerHTML={{ __html: sanitizer(html) }}
        /> */}
  </>
)};
export default EditorView;
