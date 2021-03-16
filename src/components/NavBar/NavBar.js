import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import "./NavBar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class NavBar extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

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

            <Link to="/">Home</Link>
            <Link to="/mapview">Map</Link>
            <Link to="uploadPhotos">Photo</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="settings">
            <Link to="/login"><span><FaIcons.FaCog /></span></Link>
            <Link to="/profile"><span><FaIcons.FaUser /></span></Link>
          </div>

        </nav>
      </>
    );
  }
}

export default NavBar;
