import React from 'react'
import useImageUpload from "../CustomHooks/useSelectImageUpload";
const UploadNewImage = ()=>{
    const { getRootProps, getInputProps, files } = useImageUpload();
    
    const thumbs = files.map(file => (
        <div className='thumb' key={file.name}>
          <div className ='thumb-inner'>
            <img src={file.preview} className='thumb-preview' alt={""} />
          </div>
        </div>
      ));
    return (
        <>
<aside className='thumbs-container'>{thumbs}</aside>
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
        </>
    )
}
export default UploadNewImage