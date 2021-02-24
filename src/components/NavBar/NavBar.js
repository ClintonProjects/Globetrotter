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

          <div className="links"></div>
          <div className="logo">
          <FaIcons.FaGlobeEurope />
          </div>

          <div className="settings">
            <FaIcons.FaCog />
            <FaIcons.FaUser />
          </div>

        </nav>
      </>
    );
  }
}

export default NavBar;
