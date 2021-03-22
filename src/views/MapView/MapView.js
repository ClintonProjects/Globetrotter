import React, { Component } from "react";
import Map from "../../components/Map/Map.js";
import TripForm from "../../components/TripForm/TripForm.js";
import Footer from "../../components/footer/Footer.js";
import NavBar from "../../components/NavBar/NavBar.js";

import { BrowserRouter as Router, Link } from "react-router-dom";

class Preloginmap extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="row text-center">
          <Map currentUser={this.props.currentUser} />
          {this.props.authenticated && (
            <TripForm currentUser={this.props.currentUser} />
          )}
        </div>
      </div>
    );
  }
}

export default Preloginmap;
