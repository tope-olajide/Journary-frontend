import React from "react";
import AuthNav from "../commons/AuthNav";
import Footer from "../commons/Footer";
const SignUpView = ({ handleChange, handleFormSubmit, isLoading }) => {
  return (
    <>
      <AuthNav />
      <section className="form-section">
        <form className="form-container register-form">
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="firstname and lastname"
            onChange={handleChange}
            name="fullname"
          />
          <input
            type="email"
            placeholder="email"
            onChange={handleChange}
            name="email"
          />
          <input
            type="text"
            placeholder="username"
            onChange={handleChange}
            name="username"
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            name="password"
          />
          <input
            type="password"
            placeholder="repeat password"
            onChange={handleChange}
            name="repeatPassword"
          />
          <section className="form-button">
            <button disabled={isLoading} onClick={handleFormSubmit}>
              {isLoading ? "signing up..." : "Register"}
            </button>
          </section>
        </form>
      </section>

      <Footer />
    </>
  );
};
export default SignUpView;
