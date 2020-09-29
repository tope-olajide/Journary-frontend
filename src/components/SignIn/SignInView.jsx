import React from "react";
import AuthNav from "../commons/AuthNav";
import Footer from "../commons/Footer";

const SignInView = ({handleChange, handleFormSubmit, isLoading}) => {
  return (
    <>
      <AuthNav />
      <section className="form-section">
        <form className="form-container">
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="username or email"
            name="authName"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <section className="form-button">
            <button disabled={isLoading} onClick={handleFormSubmit}>
            {isLoading ? "Logging in..." : "Sign in"}
            </button>
          </section>
        </form>
      </section>
      <Footer />
    </>
  );
};
export default SignInView;
