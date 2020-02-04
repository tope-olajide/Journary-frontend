import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dompurify from "dompurify";
import formateDate from '../../utils/formatDate'
import MainNavigationBar from "../commons/MainNavigationBar";
import Footer from "../commons/Footer"
const EntryDetailsView = ({ title, content, date, viewCount, toggleDeleteModal, isDeleteModal, isOwner, deleteEntry, modifyEntry }) => {
  const sanitizer = dompurify.sanitize;
  return (
    <>
    <MainNavigationBar />
      <section class="entry-details-container">
        <header>
          <h1 class="entry-details-title">{title}</h1>
          <section className="entry-details-option">
            <p>{formateDate(date)}</p>
            <div className="right-details">
              <span className="view-count">
                <FontAwesomeIcon className="" icon="eye" size="2x" />{" "}
                <p>{viewCount}</p>
              </span>
              <FontAwesomeIcon onClick={toggleDeleteModal} className="icon" style={isOwner?"":{display:'none'}}  icon="trash" size="2x" />
              <FontAwesomeIcon onClick={modifyEntry} className="icon"style={isOwner?"":{display:'none'}} icon="edit" size="2x" />
            </div>
          </section>
        </header>

        <article dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
        <section className = "delete-modal" style={isDeleteModal?{display:'block'}:{display:'none'}}>
        <section className="delete-modal-header">
              <span  onClick={toggleDeleteModal} className="close">&times;</span>
             <h2>Delete entry?</h2>
            </section>
            <div class="delete-modal-body">
 <p>Are you sure you want to delete "<b>{title}</b>"</p>
 <div className ="delete-button-container">
<button className="primary delete-button" onClick = {deleteEntry}>Yes</button> <button onClick={toggleDeleteModal} className=" primary delete-button">No</button></div>
            </div>
        </section>
      </section>
      <Footer />
    </>
  );
};
export default EntryDetailsView;
