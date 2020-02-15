import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainNavigationBar from "../commons/MainNavigationBar";
import Footer from "../commons/Footer";
const ErrorPage = () => {
  return (
    <>
      <MainNavigationBar />
      <section className="error-page-container">
        <section>
          <h1>
            <FontAwesomeIcon
              className=""
              icon="exclamation-triangle"
              size="2x"
            />
          </h1>
        </section>
        <h1> Oops! Something went wrong</h1>
        <p> Why not try refreshing this page or go back to homepage</p>
        <button> Back to Homepage</button>
      </section>
      <Footer />
    </>
  );
};
export default ErrorPage;
