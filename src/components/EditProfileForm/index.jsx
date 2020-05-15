import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import EditProfileForm from "./EditProfileForm";
import useToggleImageGallery from "../CustomHooks/useToggleImageGallery";
import ImageGalleryUploadModal from "../Editor/ImageGalleryUploadModal";
import useForm from "../CustomHooks/useForm";
import handleNetworkError from "../../utils/networkErrorHandler";
import { ToastContainer, toast } from "react-toastify";
import jsonwebtoken from "jsonwebtoken";
import { Store } from "../../Store";
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage";
const EditProfile = () => {
  const { dispatch } = React.useContext(Store);
  const url = "http://localhost:8080/api/user";
  const { inputs, handleChange } = useForm({ fullname: "" });
  const { toggleGalleryModal, isGalleryModal } = useToggleImageGallery();
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const setHeaderToken = {
    headers: {
      authorization: token,
    },
  };
  const updateProfile = async (event) => {
    event.preventDefault();
    const fullname = inputs.fullname || data.userData[0].fullname;
    const email = inputs.email || data.userData[0].email;
    const about = inputs.about || data.userData[0].about;
    const imageUrl = data.userData[0].about || profilePicture;
    const modifiedUserData = { fullname, email, about, imageUrl };
    console.log(inputs);
    console.log(modifiedUserData);
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${url}/update-profile`,
        modifiedUserData,
        setHeaderToken
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.authorization = token;
      toast.success("data updated successfully", {
        position: "bottom-left",
      });
      const userData = jsonwebtoken.decode(localStorage.getItem("token"));
      return dispatch({
        type: "SET_CURRENT_USER",
        userData,
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage = handleNetworkError(error);
      return toast.error(errorMessage, {
        position: "bottom-left",
      });
    }
  };
  const addImage = (imageUrl) => {
    setProfilePicture(imageUrl);
  };
  const fetcher = async (...args) => {
    const response = await axios.get(`${args}`, setHeaderToken);
    const { userData, privateEntriesCount, publicEntriesCount } = response.data;
    console.log({ userData, privateEntriesCount, publicEntriesCount });
    /* setProfilePicture(response.data.user_image_url) */
    return response.data;
  };
  const { data, error } = useSWR(url, fetcher);
  if (error)
    return (
      <>
        <ErrorPage />
      </>
    );
  if (!data)
    return (
      <>
        <LoadingPage />
      </>
    );
  return (
    <>
      {console.log(data.userData[0].fullname)}
      {isGalleryModal ? (
        <ImageGalleryUploadModal
          addImage={addImage}
          toggleGalleryModal={toggleGalleryModal}
        />
      ) : null}
      <EditProfileForm
        toggleGalleryModal={toggleGalleryModal}
        profilePicture={data.user_image_url || profilePicture}
        defaultFullname={data.userData[0].fullname}
        defaultEmail={data.userData[0].email}
        handleChange={handleChange}
        defaultAbout={data.userData[0].about}
        updateProfile={updateProfile}
        isLoading={isLoading}
      />
      <ToastContainer />
    </>
  );
};
export default EditProfile;
