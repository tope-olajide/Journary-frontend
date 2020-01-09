import React,  { useState } from "react"
import { Link } from 'react-router-dom';

const AuthNav = () =>{
    const [isNavOpen, setIsNavOpen] = useState (false)
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }
 return (
 <>
 <nav>
      <section className="main-nav">
      <h2 className="logo">Journary</h2>
      <div id="myNav" className="overlay" style={isNavOpen?{width:'100%'}:{width:0}}>
          <span className="closebtn" onClick={toggleNav}>&times;</span>
          <div className="overlay-content">
          <Link to="/"><p onClick={toggleNav}>Home</p></Link>
          <div className="auth-button">
            <Link to="/create-account"><button onClick={toggleNav} className="primary fit">Sign up</button></Link>
            <Link onClick={toggleNav} to="/sign-in"><button className="fit">Sign in</button></Link>
            </div>
          </div>
        </div>
      <div className="menu-icon" onClick={toggleNav}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
      </div>
      </section>
        </nav>
 </>)
}
export default AuthNav