import React, {useState} from "react";
import axios from "axios";
import useSWR from "swr";
import EntryDetailsView from "./EntryDetailsView";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import handleNetworkError from "../../utils/networkErrorHandler";
import LoadingPage from "../commons/LoadingPage";
import ErrorPage from "../commons/ErrorPage";
const token = localStorage.getItem("token");
const setHeaderToken = {
  headers: {
    authorization: token
  }
};
const EntryDetails = ({ match }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [redirectToHomepage, setRedirectToHomepage] = useState(false);
  const [redirectToModifyEntry, setRedirectToModifyEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { entryId } = match.params;
  const url = `http://localhost:8080/api/entry/${entryId}`;
  const fetcher = async (...args) => {
    const response = await axios.get(`${args}`, setHeaderToken);
    return response.data;
  };
  const toggleDeleteModal = () => {
    setIsDeleteModal(!isDeleteModal)
  }
  const deleteEntry =async () => {
    try {
    setIsLoading(true);
    await axios.delete(`${url}`, setHeaderToken);
    toggleDeleteModal()
    toast.success(`${data.title} removed successfully`);
            setTimeout(() => {
              setRedirectToHomepage(true);
            }, 3000);
        }
        catch (error) {
            setIsLoading(false);
            const errorMessage = handleNetworkError(error);
            toggleDeleteModal()
            return toast.error(errorMessage, {
              position: "bottom-left"
            });
          }
  }
  const modifyEntry = () => {
    setRedirectToModifyEntry(true)
  }
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
  if (redirectToHomepage) {
    return <Redirect to="/" />;
  }
  if (redirectToModifyEntry) {
    return <Redirect to={`/modify-entry/${entryId}`} />;
  }
  return (
    <>
      <EntryDetailsView
        title={data.entry.title}
        content={data.entry.content}
        viewCount={data.entry.view_count}
        date = {data.entry.created_at}
        toggleDeleteModal = {toggleDeleteModal}
        isDeleteModal = {isDeleteModal}
        isOwner = {data.isOwner}
        deleteEntry = {deleteEntry}
        modifyEntry = {modifyEntry}
      />
      <ToastContainer />
    </>
  );
};
export default EntryDetails;
