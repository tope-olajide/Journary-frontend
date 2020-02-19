import React from "react";
import useImageUpload from "../CustomHooks/useImageUpload";
import { ToastContainer, toast } from "react-toastify";
const UploadNewImage = () => {
  const {
    getRootProps,
    getInputProps,
    files,
    imageUpload,
    isUploading,
    toastMessage
  } = useImageUpload();
  const uploadImage = async () => {
    await imageUpload(files);
  };
  const displayToastMessage = (status, message) => {
    if (status==="error"){
      return  toast.error(message, {
        position: "bottom-left"
      })
    }
    return  toast.success(message, {
      position: "bottom-left"
    })
  };
  const thumbs = files.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <img src={file.preview} className="thumb-preview" alt={""} />
      </div>
    </div>
  ));
  return (
    <>
      
      <aside className="thumbs-container">{thumbs}</aside>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="upload-info-container">
          <h3>Drag 'n' drop pictures here</h3> <h3> or </h3>
          <h3>click to select </h3>
        </div>
      </div>
      <div className="center">
        <button disabled={isUploading} onClick={uploadImage}>
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
      <div style={{display:'none'}}>{toastMessage
        ? displayToastMessage(toastMessage.status, toastMessage.message)
        : ""}</div>
      <ToastContainer />
    </>
  );
};
export default UploadNewImage;
