import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import Trip, { tripConverter } from "../fsObjConversion.js"; // for fs transfers
import ISO from "./names.json";
import "./TripForm.css";
import { Container, Form, Button, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap';

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore();

const options = Object.values(ISO);


class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docRef: firestore.collection("users").doc(localStorage.getItem("uid")),
      locationRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("locations"),
      tripRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("trips"),
      trips: [],
      notList: [],
      selectedCountry: ''
    };
    this.addData = this.addData.bind(this);
    this.getKeyByValue = this.getKeyByValue.bind(this);
    this.setUserNotifications = this.setUserNotifications.bind(this);
  }
  // function that will add data to firestore
  addData(event) {
    // add try catch to prevent firestore error on invalid input
    try {
      event.preventDefault(); // prevent the form from actually submitting
      var country = this.state.selectedCountry;
      var startDate = document.getElementById("startdate");
      var endDate = document.getElementById("enddate");
      const docID = country;
      const userSeries = {
        location: {
          id: this.getKeyByValue(ISO, country),
          name: country,
          fill: `amd4color("#000")`,
        },
      };
      this.state.locationRef.doc(`${docID}`).set(userSeries);
      this.state.tripRef
        .doc(`${docID}`)
        .withConverter(tripConverter)
        .set(new Trip(country, startDate.value, endDate.value));
      console.log("trip added");
    } catch (error) {
      alert("invalid input");
      console.error(error);
    }
  }
  // gets ISO for user chosen country
  getKeyByValue(object, value) {
    return Object.keys(object).find(
      (key) => object[key].toLowerCase() === value.toLowerCase()
    );
  }

  setUserNotifications = (not) => {
    const firestore = firebase.firestore().collection('users').doc(localStorage.getItem("uid"));
    let jsonSplit;
    var list = [];
    firestore.onSnapshot((data) => {
      let json = JSON.stringify(data.data());
      jsonSplit = JSON.parse(json);
      if (!jsonSplit.notifications.includes(not) && !this.state.notList.includes(not)) {
        this.setState({ notList: jsonSplit.notifications });
        list = this.state.notList;
        list.push(not);
        console.log("notfication added to db: " + not);
        this.setState({ notList: list });
        firebase.firestore().collection('users').doc(localStorage.getItem("uid")).set({ notifications: list });
      }
    });
    return;
  }

  componentDidMount() {
    this.state.tripRef.withConverter(tripConverter).onSnapshot((docs) => {
      if (!docs.empty) {
        var arr = [];
        docs.forEach((doc) => {
          var trip = doc.data();
          arr.push(trip.toObject());
        });
        this.setState({ trips: arr });
      } else {
        console.log("No document");
      }
    });
  }
//React select value handling inpired from https://stackoverflow.com/a/47850550
  captureSelectValue = (e) => {
    let {name, value} = e.target;
    this.setState({selectedCountry: value})
  }

  render() {
    return (
      <Container fluid="true" >
      <Row className="pt-5">
      <Col className=" pt-4">
        <Row className="pt-3">
          <p className="h4">Trips History</p>
        </Row>
        <Row className="trip_form_left_col">
          <Dropdown id="country" title="Select Trip Country">
          <Dropdown.Toggle  className="buttonStyle" block="true">
            VISITED COUNTRIES
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100" >
            {this.state.trips.map((trip, index) => (
                <Dropdown.Item key={index}>{
                  <Container className="p-1">
                    <Row>
                      <Col className="col-8 text-center">
                        <Row>
                        {trip.country}
                        </Row>
                          <Row>
                          <span>from : {trip.startDate}</span>
                          <span>to : {trip.endDate}</span>
                        </Row>
                      </Col>
                    </Row>
                    </Container>
                }
                </Dropdown.Item>
            ))
            }
          </Dropdown.Menu>
        </Dropdown>
              </Row>
      </Col>
      <Col xs={6}>
        <Row >
          <Col/>
          <Col className="trip_form_middle_col contactUs p-5 mt-5">
            <p className="h2 text-center">Your Trip</p>
            <Form onSubmit={this.addData}>
                <Form.Group>
                  <Form.Control as="select" id="country" className="select_center_align" onChange={this.captureSelectValue}>
                    <option key='blankChoice' hidden value >Select Trip Country</option>
                    {options.map((option, index) => (
                        <option key={index} block="true">{option}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control id="startdate"  className="text-center" name="startdate" type="input" placeholder="Enter Start Date"/>
                </Form.Group>
                <Form.Group>
                  <Form.Control id="enddate"  className="text-center" name="enddate" type="input" placeholder="Enter End Date"/>
                </Form.Group>
                <Button id="submit" className="buttonStyle" variant="primary" type="submit" block="true" onClick={() => this.setUserNotifications("You have added a trip!")}>
                SUBMIT
                </Button>
            </Form>
          </Col>
          <Col/>
        </Row>
      </Col>
            <Col />
            </Row>
      </Container>
    );
  }
}

export default TripForm;
