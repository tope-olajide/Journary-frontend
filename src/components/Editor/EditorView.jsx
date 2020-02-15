import React, { useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import CustomToolbars from "./CustomToolbars";
import { Store } from "../../Store";
const EditorView = ({
  onEditorStateChange,
  editorState,
  defaultEditorState
}) => {
  const { state } = useContext(Store);
  return (
    <>
      <section className="editor-container">
        <Editor
          wrapperClassName={
            state.maximizeEditor ? "editor-wrapper-max" : "editor-wrapper-min"
          }
          editorClassName={
            state.maximizeEditor ? "editor-max" : "editor-min"
          }
          toolbarClassName="toolbar"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { className: "hide-default-image-icon" }
          }}
          toolbarCustomButtons={[<CustomToolbars />]}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          defaultEditorState={defaultEditorState}
        />
      </section>
    </>
  );
};
export default EditorView;
