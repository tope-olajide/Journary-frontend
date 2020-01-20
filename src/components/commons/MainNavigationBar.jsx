import React, {useState} from "react";
import { Link } from 'react-router-dom';
const MainNavigationBar = () => {
    const [isNavOpen, setIsNavOpen] = useState (false)
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }
  return (
    <>
      <nav>
        <section className="main-nav">
          <h2 className="logo">Journary</h2>
          <div
            id="myNav"
            className="overlay"
            style={isNavOpen ? { width: "100%" } : { width: 0 }}
          >
            <span className="closebtn" onClick= {toggleNav} >
              &times;
            </span>
            <div className="overlay-content">
              <Link to="/">
                <span className="main-nav-link" onClick={toggleNav}>Home</span>
              </Link>
              <Link to="/entries">
                <span className="main-nav-link"  onClick={toggleNav}>Diaries</span>
              </Link>
              <Link to="/new-entry">
                <span className="main-nav-link"  onClick={toggleNav}>New Entry</span>
              </Link>
              <Link to="/entries">
                <span className="main-nav-link"  onClick={toggleNav}>Profile</span>
              </Link>
              <Link to="/entries">
                <span className="main-nav-link"  onClick={toggleNav}>Logout</span>
              </Link>
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
