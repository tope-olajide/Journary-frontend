import { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

const useEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlContents, setHtmlContents] = useState("");
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    const htmlContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setHtmlContents(htmlContent);
  };

  return {
    onEditorStateChange,
    editorState,
    htmlContents,
    setEditorState
  };
};
export default useEditor;
