import React from "react";
import MainNavigationBar from "../MainNavigationBar";
import Footer from "../Footer";
import ErrorPageView from './ErrorPageView'
const ErrorPage = () => {
  return (
    <>
      <MainNavigationBar />
      <ErrorPageView />
      <Footer />
    </>
  );
};
export default ErrorPage;