import React, { Component } from "react";
import RegisterMessage from "../../components/Pre-LoginMap/RegisterMessage";
import { Route } from "react-router";
import DemoMap from "./demo_map.png";
import "./Preloginmap.css";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

class Preloginmap extends Component {
  render() {
    return (
      <Container id="PreloginMap" fluid>
        <RegisterMessage className="preloginMessage"/>
        {/*<Link to="/profile">
           <div class="prelogmap"> 
          <img src={DemoMap} class="img" />
          </div> 
        </Link> */}
      </Container>
    );
  }
}

export default Preloginmap;
