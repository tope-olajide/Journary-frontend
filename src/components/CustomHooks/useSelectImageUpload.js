import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
const useImageUpload = () => {
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
      return {
        getRootProps,
        getInputProps,
        files
      }
}
export default useImageUpload;