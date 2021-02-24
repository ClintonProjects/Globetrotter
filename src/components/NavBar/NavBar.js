import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <>
        <nav id="bar">

          <div className="burger">
            <div id="top"></div>
            <div id="bottom"></div>
          </div>

          <div className="logo">
          <FaIcons.FaGlobeEurope />
          </div>

          <div className="links">
            <span>Home</span>
            <span>Map</span>
            <span>Photos</span>
            <span>About</span>
          </div>

          <div className="settings">
          <span><FaIcons.FaCog /></span>
          <span><FaIcons.FaUser /></span>
          </div>

        </nav>
      </>
    );
  }
}

export default NavBar;
