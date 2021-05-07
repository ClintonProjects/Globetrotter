import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import "firebase/auth"; // attach authentication
import { Setting, settingsConverter } from "../fsObjConversion.js";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const firestore = firebase.firestore(); // create fs instance

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      updated: false,
      personRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("settings"),
    };
    this.addData = this.addData.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }
  addData(event) {
    // adding user settings to firestore
    try {
      event.preventDefault();
      var fullname = document.getElementById("fullname");
      var birthday = document.getElementById("birthday");
      var gender = document.getElementById("gender");

      this.state.personRef
        .doc(localStorage.getItem("uid"))
        .withConverter(settingsConverter)
        .set(new Setting(fullname.value, birthday.value, gender.value));
      console.log("Details modified");
      alert("Grand! Your details have been updated.");
    } catch (error) {
      alert("Invalid input");
      console.error(error);
    }
  }

  // Method to be able to change your password
  changePassword() {
    var password = document.getElementById("password");
    var user = firebase.auth().currentUser;
    user
      .updatePassword(password.value) 
      .then(() => alert("Congratulations, your password has been changed"))
      .catch((err) => alert(err.message));
  }

  // Method to be able to change your own email
  changeEmail() {
    var email = document.getElementById("email");
    var user = firebase.auth().currentUser;
    user
      .updateEmail(email.value)
      .then(() => alert("Congratulations, your email has been changed"))
      .catch((err) => alert(err.message));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col />
          <Col className="col-8 contactUs p-4">
            <p className="h2 ">Personal Information</p>
            <hr className="textColour" />
            {!this.state.updated && (
              <Form onSubmit={this.addData}>
                <Form.Group>
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    id="fullname"
                    name="Name"
                    type="input"
                    fill_color_override="true"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Birthday (DD/MM/YYYY):</Form.Label>
                  <Form.Control
                    id="birthday"
                    name="birthday"
                    type="input"
                    fill_color_override="true"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender (F/M):</Form.Label>
                  <Form.Control
                    id="gender"
                    name="gender"
                    type="input"
                    fill_color_override="true"
                  />
                </Form.Group>

                <Button
                  className="buttonStyle"
                  variant="primary"
                  type="submit"
                  block
                >
                  UPDATE
                </Button>
              </Form>
            )}
            {/* redirects user to add a trip once they have updated their details */}
            {this.state.updated && (
              <Row>
                <p>Your details are now updated! Please add your first trip.</p>
                <Link to="tripform">
                  <Button className="buttonStyle" variant="primary" block>
                    Add Trip
                  </Button>
                </Link>
              </Row>
            )}

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Row className="pb-3">
                <Col>
                  <Form.Control
                    id="email"
                    className="whiteBackground"
                    name="email"
                    type="email"
                    // onChange event listener to set state when user enters their data
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                  />
                  
                </Col>
                <Col>
                  <Button
                    variant="outline-info"
                    type="submit"
                    block
                    onClick={this.changeEmail}
                  >
                    CHANGE EMAIL
                  </Button>
                </Col>
              </Form.Row>
              <Form.Label>Password:</Form.Label>
              <Form.Row className="pb-3">
                <Col>
                  <Form.Control
                    id="password"
                    className="whiteBackground"
                    name="password"
                    type="password"
                    // onChange event listener to set state when user enters their data
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    variant="outline-info"
                    type="submit"
                    block
                    onClick={this.changePassword}
                  >
                    CHANGE PASSWORD
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default Settings;
