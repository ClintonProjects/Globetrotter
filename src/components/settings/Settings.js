import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import { Setting, settingsConverter } from "../fsObjConversion.js";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
//import "./Settings.css";

const firestore = firebase.firestore(); // create fs instance
var user = firebase.auth().currentUser;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("settings"),
    };
    this.addData = this.addData.bind(this);
  }
  addData(event) {
    // adding user settings to firestore
    try {
      event.preventDefault();
      var fullname = document.getElementById("fullname");
      var birthday = document.getElementById("birthday");
      var gender = document.getElementById("gender");
      var email = document.getElementById("email");
      var password = document.getElementById("password"); // Not sure about adding password ?

      // this.state.tripRef
      //   .doc(`${docID}`)
      //   .withConverter(tripConverter)
      //   .set(new Trip(country.value, startDate.value, endDate.value));

      this.state.personRef
        .doc(localStorage.getItem("uid"))
        .withConverter(settingsConverter)
        .set(new Setting(fullname.value, birthday.value, gender.value, email.value ));
      console.log("details modified");
    } catch (error) {
      alert("invalid input");
      console.error(error);
    }
  }

  /*componentDidMount() {
    this.state.personRef.withConverter(settingsConverter).onSnapshot((docs) => {
      if (!docs.empty) {
        var arr = [];
        docs.forEach((doc) => {
          var settings = doc.data();
          arr.push(settings.toObject());
        });
        this.setState({ settings: arr });
      } else {
        console.log("It's empty");
      }
    });

  } */
  render() {
    console.log("evan => ", user);
    return (
      <Container>
        <Row>
          <Col>
          <Col className="col-8 contactUs p-4">
            <p className="h2 ">Personal Information</p>
            <hr className="textColour" />
            <Form onSubmit={this.addData}>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  id="fullname"
                  name="Name"
                  type="text"
                  value={""}
                />
                <input type="text" id="fname" name="fname"></input>
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday (DD/MM/YYYY):</Form.Label>
                <Form.Control
                  id="birthday"
                  name="birthday"
                  type="input"
                  value={""}
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Gender (F/M):</Form.Label>
                <Form.Control
                  id="gender"
                  name="gender"
                  type="input"
                  value={""}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  id="email"
                  className="whiteBackground"
                  name="email"
                  type="email"
                  value={""}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Row className="pb-3">
                  <Col>
                    <Form.Control
                      id="password"
                      className="whiteBackground"
                      name="password"
                      type="password"
                      value={""}
                    />
                  </Col>
                  <Col>
                    <Button variant="outline-info" type="submit" block>
                      CHANGE PASSWORD
                    </Button>
                  </Col>
                </Form.Row>
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
          </Col>
          </Col>
        </Row>
        </Container>
    );
  }
}

export default Settings;
