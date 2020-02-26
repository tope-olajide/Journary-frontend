import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const PageNotFound = () => {
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
        <h1>Error 404!</h1>
        <p> The page you requested was not found</p>
        <Link to="/"><button> Back to Homepage</button></Link></section>
    </>
  );
};
export default PageNotFound;
