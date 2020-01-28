import React from "react";
import AuthNav from "../commons/AuthNav";
import Footer from "../commons/Footer";
import Image from "react-graceful-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EditProfileForm = ({ handleChange, defaultAbout, toggleGalleryModal, profilePicture, isLoading, defaultEmail, defaultFullname,updateProfile }) => {
  return (
    <>
      <AuthNav />
      <section className="form-section">
        <form className="form-container register-form">
          <h1>Modify Your Profile</h1>
          <figure><Image className="profile-image edit-profile-form-image" src ={profilePicture} alt={""} />  <FontAwesomeIcon onClick={toggleGalleryModal}
                          className="camera-icon"
                          icon="camera"
                          size="2x"/>
          </figure>
        
          <input
            type="text"
            placeholder="Firstname and Lastname"
            onChange={handleChange}
            name="fullname"
            defaultValue={defaultFullname}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            defaultValue={defaultEmail}
          />
          <textarea
          className="about-textbox"
          rows="5"
          onChange={handleChange}
          about="repeatNewPassword"
          defaultValue={defaultAbout}
          placeholder="About..."
          name="about"

          >

          </textarea>
          <section className="form-button">
            <button disabled={isLoading} onClick={updateProfile}>
              {isLoading ? "Updating profile..." : "Update Profile"}
            </button>
          </section>
        </form>
      </section>
      <Footer />
    </>
  );
};
export default EditProfileForm;
