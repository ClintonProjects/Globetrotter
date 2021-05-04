import React, { Component } from "react";
import { Container, Form, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import "./RegisterMessage.css";
import Map from './Map';
import Login from '../Login/login.js';
import logo from "../NavBar/logo/fullLogoNew.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


export class RegisterMessage extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (

      <Container className="registerMessageBody">
      <Row>
         <Col/>
         <Col className="col-4 register p-4">
         <img src={logo} alt="Logo" />
       <p className="h2 textColour text-center">Welcome!</p>
       <p className="h6 textColour text-center pb-3">To unlock all features, please</p>
       
         <Row className="no-gutters">
           <Col>
           <Link className="nounderline" to="/login" onClick={this.props.picBack}>
           <Button className="buttonStyle" variant="primary" block>LOGIN</Button>
           </Link>
           </Col>
           <Col xs={2} ><p className="h6 textColour text-center">or</p></Col>
           <Col>
           <Link className="nounderline" to="/register" onClick={this.props.picBack}>
           <Button onClick={this.kepUserLogedIn} className="buttonStyle" variant="primary" block>REGISTER</Button>
           </Link>
           </Col>
         </Row>
       </Col>
       <Col/>
       </Row>

     </Container>


    );
  }
}

export default RegisterMessage;
