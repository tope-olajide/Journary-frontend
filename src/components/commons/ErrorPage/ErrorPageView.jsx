import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const ErrorPageView = () => {
  return (
    <>
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
        <Link to="/"><button> Back to Homepage</button></Link></section>
    </>
  );
};
export default ErrorPageView;
