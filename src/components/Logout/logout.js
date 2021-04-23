import React, { Component } from "react";
import { Container, Form, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import Firebase from "firebase/app";
import 'firebase/auth';
import "./logout.css";
import logo from "../NavBar/logo/fullLogoNew.png";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
} from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
    this.kepUserLogedIn = this.kepUserLogedIn.bind(this);
  } // end constructor

  logOutUser() {
    // Make a call to firebase authentication
    // this API will log the user out now.
    Firebase.auth().signOut();
    localStorage.clear("uid");
  }

  kepUserLogedIn() {
    // Keep the user logged in
    // Redirect to map view? 
  }

  render() {
    return (
      <Container >
       <Row className="pt-5">
          <Col/>
          <Col className="col-4 register p-4">
          <img src={logo} alt="Logo" />
        <p className="h2 textColour text-center">Come back soon!</p>
        <p className="h6 textColour text-center pb-3">Are you sure you want to log out?</p>
        
          <Row>
            <Col>
            {/* <Link to="/tripForm" ><u>Add a Trip</u></Link> */}
            <Button onClick={this.logOutUser} className="buttonStyle" variant="primary" type="submit" block>LOGOUT</Button>
            </Col>
            <Col>
            <Button onClick={this.kepUserLogedIn} className="buttonStyle" variant="primary" type="submit" block>STAY</Button>
            </Col>
          </Row>
        </Col>
        <Col/>
        </Row>

      </Container>


    ); // end of return statement
  } // end of render function
} // end of class

export default Logout;
