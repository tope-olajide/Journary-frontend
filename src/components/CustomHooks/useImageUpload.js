import { useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios'
import { Store } from "../../Store";
require('dotenv').config();


const useSelectImageFile =  () => {
  const { dispatch } = useContext(Store);
    const [files, setFiles] = useState([]);
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
        if(!files.length){
            return {
                success: false,
                message: 'No picture file has been selected'
            }
        }
        else{
        try{
        let uploadedImages = [];
        let failedUploads = [];
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
          }
          catch (err) {
            console.log(file.name)
            failedUploads.push(file.name)
            return {
              success: false,
              message: `unable to upload ${file}`
            };
          }
          });
          // Once all the files are uploaded
       return axios
        .all(uploaders)
        .then(async data => {
          if(failedUploads.length){
            return {
              success: false,
              message: `unable to upload ${failedUploads}`
            }
          }
          const stringifiedImageUrl = JSON.stringify(uploadedImages);
          const response = await axios.post(`${url}/gallery`, {stringifiedImageUrl})
            const { uploadedPictures } = response.data;
            dispatch({  
              type: 'UPLOAD_PICTURES',
              uploadedPictures
            });
            return {
                  success:true,
                  message: 'Images saved successfully'
              }
        }).catch((err)=>{
          console.log(err)
          return {
            succes: false,
            message: err
        }
        })}
        catch (err) {
          console.log(err)
          return {
              succes: false,
              message: err
          }
        };
      }
    }
      return {
        getRootProps,
        getInputProps,
        files,
        imageUpload
      }
}
export default useSelectImageFile;