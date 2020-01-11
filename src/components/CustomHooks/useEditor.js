import  { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
const useEditor =()=> {
const [editorState, setEditorState] = useState(EditorState.createEmpty());
const onEditorStateChange = editorState => {
    setEditorState(editorState);
    const html= draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(html)
  };
  const html= draftToHtml(convertToRaw(editorState.getCurrentContent()))
  
return {
    onEditorStateChange, editorState, html
}

}
export default useEditor