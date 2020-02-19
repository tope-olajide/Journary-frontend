import React,  { useState } from "react"
import { Link } from 'react-router-dom';
import useTheme from '../CustomHooks/useTheme'
const AuthNav = () =>{
    const [isNavOpen, setIsNavOpen] = useState (false);
    const { changeTheme } = useTheme()
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
            </div><section className="theme-container">
                <div onClick={()=>{changeTheme('red')}} className="theme-color red"></div>
                <div onClick={()=>{changeTheme('indigo')}} className="theme-color indigo"></div>
                <div onClick={()=>{changeTheme('pink')}}className="theme-color pink"></div>
                <div onClick={()=>{changeTheme('green')}} className="theme-color green"></div>
                <div onClick={()=>{changeTheme('teal')}}className="theme-color teal"></div>
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
 </>)
}
export default AuthNav