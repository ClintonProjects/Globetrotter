import React, { Component } from "react";
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

          <div className="logo"></div>
          <div className="links"></div>
          <div className="settings"></div>

        </nav>
      </>
    );
  }
}

export default NavBar;
