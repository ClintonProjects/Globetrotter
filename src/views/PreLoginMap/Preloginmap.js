import React, { Component } from "react";
import RegisterMessage from "../../components/Pre-LoginMap/RegisterMessage";
import { Route } from "react-router";
import DemoMap from "./demo_map.png";

import { BrowserRouter as Router, Link } from "react-router-dom";

class Preloginmap extends Component {
  render() {
    return (
      <div>
        <RegisterMessage />
        <Link to="/login">
          <img src={DemoMap} alt="" />
        </Link>
      </div>
    );
  }
}

export default Preloginmap;
