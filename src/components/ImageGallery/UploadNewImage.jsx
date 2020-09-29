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
  const uploadImage = () => {
    let uploadedImages = [];
  const uploaders = files.map(async file => {
    // Initial FormData
    const formData = new FormData();
    formData.append("upload_preset", "sijxpjkn");
    formData.append("api_key", "139423638121511");
    formData.append("file", file);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    try {
    let response = await fetch({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
      data: formData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    const { data } = response;
    const { secure_url, public_id } = data;
    uploadedImages.push({ imageUrl: secure_url, imageId: public_id });
    console.log(uploadedImages);

  }
  catch (err) {
    console.log(err)

  }

  }) 
// Once all the files are uploaded
return Promise.all(uploaders)
.then(async data => {
  console.log(data)
})
  }
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
