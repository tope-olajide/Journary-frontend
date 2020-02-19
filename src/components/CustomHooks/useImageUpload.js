import { useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios'
import { Store } from "../../Store";
require('dotenv').config();

const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const useSelectImageFile =  () => {
  const { dispatch } = useContext(Store);
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
          setFiles(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        }
      });
      useEffect(
        () => () => {
          // Make sure to revoke the data uris to avoid memory leaks
          files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
      );
      const imageUpload = async (files) => {
        
        const url = "https://journary.herokuapp.com/api/user";
        if(!files.length) {
          return setToastMessage ({
                status: 'error',
                message: 'No picture files were selected'
            })
        }
        else{
        try{
        let uploadedImages = [];
        let failedUploads = [];
        setIsUploading(true)
        const uploaders = files.map(async file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("upload_preset", "sijxpjkn");
            formData.append("api_key", "139423638121511");
            formData.append("file", file);
            formData.append("timestamp", (Date.now() / 1000) | 0);
      
            // Make an AJAX upload request using Axios
            try {
            let response = await axios({
              method: "post",
              url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
              data: formData,
              headers: { "X-Requested-With": "XMLHttpRequest" },
              transformRequest: [
                (data, headers) => {
                  delete headers.common.authorization;
                  return data;
                }
              ]
            });
            const { data } = response;
            const { secure_url, public_id } = data;
            uploadedImages.push({ imageUrl: secure_url, imageId: public_id });
            console.log(uploadedImages);
            setIsUploading(false)
          }
          catch (err) {
            console.log(file.name)
            failedUploads.push(file.name)
            setIsUploading(false)
            setToastMessage ({
              status: 'error',
              message: `unable to upload ${file}`
            });
          }
          });
          // Once all the files are uploaded
       return axios
        .all(uploaders)
        .then(async data => {
          if(failedUploads.length){
            setIsUploading(false)
            setToastMessage ({
              status: 'error',
              message: `unable to upload ${failedUploads}`
            })
          }
          const stringifiedImageUrl = JSON.stringify(uploadedImages);
          const response = await axios.post(`${url}/gallery`, {stringifiedImageUrl}, setHeaderToken)
            const { uploadedPictures } = response.data;
            dispatch({  
              type: 'UPLOAD_PICTURES',
              uploadedPictures
            });
            setIsUploading(false)
              setToastMessage({
                  status: 'success',
                  message: 'Images saved successfully'
              })
        }).catch((err)=>{
          setIsUploading(false);
        setToastMessage({
          status: 'error',
          message: err
      })
        })}
        catch (err) {
          setIsUploading(false)
          console.log(err)
          setToastMessage ({
            status: 'error',
              message: err
          })
        };
      }
    }
      return {
        getRootProps,
        getInputProps,
        files,
        imageUpload,
        isUploading,
        toastMessage
      }
}
export default useSelectImageFile;