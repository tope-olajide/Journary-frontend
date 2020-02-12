import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../CustomHooks/useTheme";
import { Store } from "../../Store";
import axios from "axios";
const MainNavigationBar = () => {
  const { dispatch } = React.useContext(Store);
  const signOut = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["authorization"];
    dispatch({
      type: "SET_CURRENT_USER",
      userData: {}
    });
    window.location = "/intro";
  };
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { changeTheme } = useTheme();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <nav>
        <section className="main-nav">
          <Link to="/">
            {" "}
            <h2 className="logo">Journary</h2>
          </Link>
          <div
            id="myNav"
            className="overlay"
            style={isNavOpen ? { width: "100%" } : { width: 0 }}
          >
            <span className="closebtn" onClick={toggleNav}>
              &times;
            </span>
            <div className="overlay-content">
               <Link to="/">
                <span className="main-nav-link">Home</span>
              </Link> 
             {/* <Link to="/">
                <span className="main-nav-link">Public Entries</span>
              </Link>*/}
              <Link to="/gallery">
                <span className="main-nav-link">Gallery</span>
              </Link>
              <Link to="/new-entry">
                <span className="main-nav-link">New Entry</span>
              </Link>
              <Link to="/my-profile">
                <span className="main-nav-link">Profile</span>
              </Link>
              <Link>
                <span onClick={signOut} className="main-nav-link">
                  Logout
                </span>
              </Link>
              <section className="theme-container">
                <div
                  onClick={() => {
                    changeTheme("red");
                  }}
                  className="theme-color red"
                ></div>
                <div
                  onClick={() => {
                    changeTheme("indigo");
                  }}
                  className="theme-color indigo"
                ></div>
                <div
                  onClick={() => {
                    changeTheme("pink");
                  }}
                  className="theme-color pink"
                ></div>
                <div
                  onClick={() => {
                    changeTheme("green");
                  }}
                  className="theme-color green"
                ></div>
                <div
                  onClick={() => {
                    changeTheme("teal");
                  }}
                  className="theme-color teal"
                ></div>
              </section>
            </div>
          </div>
          <div className="menu-icon" onClick={toggleNav}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </section>
      </nav>
    </>
  );
};
export default MainNavigationBar;
