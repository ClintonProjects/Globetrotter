import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import "firebase/storage"; //needed for photo upload
import Trip, { tripConverter } from "../fsObjConversion.js"; // for fs transfers
import ISO from "./names.json";
import "./TripForm.css";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const options = Object.values(ISO);

class TripForm extends Component {
  constructor(props) {
    super(props);
    // set same user specific firestore references as Map/Map.js
    this.state = {
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
      selectedCountry: "",
      image: null,
      url: null,
      submitted: false,
    };
    this.setURL = this.setURL.bind(this);
    this.addData = this.addData.bind(this);
    this.getKeyByValue = this.getKeyByValue.bind(this);
    this.setUserNotifications = this.setUserNotifications.bind(this);
  }
  //set url for the image so we can save in firestore
  setURL(urlpassed) {
    this.setState({ url: urlpassed });
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
      // add location as json object, json objects are converted to map type in
      // firestore, when injected into map API can handle this map type
      // add trip as out own type trip needs to be converted when added to
      // firestore due to the fact we need to access the data directly when
      // listing users trips, if we allowed this to be converted to map type we
      // do not have access to the data as it is map type
      // all functionality is provided for this through fsObjConverion.js
      this.state.locationRef.doc(`${docID}`).set(userSeries);
      this.state.tripRef
        .doc(`${docID}`)
        .withConverter(tripConverter)
        .set(new Trip(country, startDate.value, endDate.value));
      console.log("trip added");
      this.setState({ submitted: true });
    } catch (error) {
      alert("invalid input");
      console.error(error);
    }
  }
  // get ISO for user chosen country, ISO needed for API to recognise country
  getKeyByValue(object, value) {
    return Object.keys(object).find(
      (key) => object[key].toLowerCase() === value.toLowerCase()
    );
  }

  setUserNotifications = (not) => {
    const firestore = firebase
      .firestore()
      .collection("users")
      .doc(localStorage.getItem("uid"));
    let jsonSplit;
    var list = [];
    firestore.onSnapshot((data) => {
      let json = JSON.stringify(data.data());
      jsonSplit = JSON.parse(json);
      if (
        !jsonSplit.notifications.includes(not) &&
        !this.state.notList.includes(not)
      ) {
        this.setState({ notList: jsonSplit.notifications });
        list = this.state.notList;
        list.push(not);
        console.log("notfication added to db: " + not);
        this.setState({ notList: list });
        firebase
          .firestore()
          .collection("users")
          .doc(localStorage.getItem("uid"))
          .set({ notifications: list });
      }
    });
    return;
  };

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
  /* React select value handling inpired from
    https://stackoverflow.com/a/47850550 */
  captureSelectValue = (e) => {
    let { name, value } = e.target;
    this.setState({ selectedCountry: value });
  };

  render() {
    const image = this.state.image;
    //sets the allowed file types that can be uploaded
    const types = ["image/jpeg", "image/png"];

    const changeHandler = (event) => {
      let photo = event.target.files[0];
      //confirms that the correct file types have been uploaded
      if (types.includes(photo.type)) {
        this.setState({ image: photo });
      } else {
        //if error
        photo = null; //removes file from photo variable if not image
        alert("Please upload an image file (jpeg or png)");
      }
    };

    const handleSubmission = () => {
      if (image != null) {
        //stops errors if user tries to upload non-image file type
        const uploadTask = storage.ref(image.name);
        const imageRef = firestore
          .collection("users")
          .doc(localStorage.getItem("uid"))
          .collection("images");
        uploadTask
          .put(image) //uploads image to firebase storage
          .on(
            "state_changed",
            (snapshot) => {
              //current progress of upload
              console.log("uploading image");
            },
            (error) => {
              //if error
              console.log(error);
              //hide progress bar after 2 sec
              setTimeout(() => this.setState({ showProgressBar: false }), 3000);
            },
            async () => {
              //if successfully uploaded, get URL
              const url = await uploadTask.getDownloadURL();
              this.setURL(url); //update state url
              console.log(this.state.url);
              const createdAt = timestamp();
              console.log(imageRef);
              imageRef.add({
                //adding the image url to the users firestore
                imageURL: url,
                date: createdAt,
                country: this.state.selectedCountry,
                name: image.name,
              });
            }
          );
      }
    };
    
    return (
      <Container fluid="true">
        <Row className="pt-5">
          <Col className=" pt-4">
            <Row className="pt-3">
              <p className="h4">Trips History</p>
            </Row>
            <Row className="trip_form_left_col">
              <Dropdown id="country" title="Select Trip Country">
                <Dropdown.Toggle className="buttonStyle" block="true">
                  VISITED COUNTRIES
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {this.state.trips.map((trip, index) => (
                    <Dropdown.Item key={index}>
                      {
                        <Container className="p-1">
                          <Row>
                            <Col className="col-8 text-center">
                              <Row>{trip.country}</Row>
                              <Row>
                                <span>from : {trip.startDate}</span>
                                <span>to : {trip.endDate}</span>
                              </Row>
                            </Col>
                          </Row>
                        </Container>
                      }
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </Col>
          <Col xs={6}>
            <Row>
              <Col />
              <Col className="trip_form_middle_col contactUs p-5 mt-5">
                {!this.state.submitted && (
                  <p className="h2 text-center">Your Trip</p>
                )}
                {this.state.submitted && (
                  <p className="h2 text-center">Congratulations!</p>
                )}
                {this.state.submitted && (
                  <p className="h2 text-center">Your Trip is added</p>
                )}
                {!this.state.submitted && (
                  <Form onSubmit={this.addData}>
                    <Form.Group>
                      <Form.Control
                        as="select"
                        id="country"
                        className="select_center_align"
                        onChange={this.captureSelectValue}
                      >
                        <option key="blankChoice" hidden value>
                          Select Trip Country
                        </option>
                        {options.map((option, index) => (
                          <option key={index} block="true">
                            {option}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        id="startdate"
                        className="text-center"
                        name="startdate"
                        type="input"
                        placeholder="Enter Start Date"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        id="enddate"
                        className="text-center"
                        name="enddate"
                        type="input"
                        placeholder="Enter End Date"
                      />
                    </Form.Group>
                    {/* adding the image with the trip form */}
                    <Form.Group>
                      <Form.File
                        className="text-left galery_small_text"
                        id="custom-file"
                        label="Choose file"
                        custom
                        multiple
                        onChange={changeHandler}
                      />
                    </Form.Group>
                    {/* this onclick is used for notifications and for adding images to the storage and the users firestore */}
                    <Button
                      id="submit"
                      className="buttonStyle"
                      variant="primary"
                      type="submit"
                      block="true"
                      onClick={() => {
                        this.setUserNotifications("You have added a trip!");
                        handleSubmission();
                      }}
                    >
                      SUBMIT
                    </Button>
                  </Form>
                )}
                {/* conditional rendering for helping user decide what they want to do next */}
                {this.state.submitted && (
                  <Link
                    className="nounderline"
                    to="/gallery"
                    onClick={this.props.picBack}
                  >
                    <Button className="buttonStyle" variant="primary" block>
                      See Photo Gallery
                    </Button>
                  </Link>
                )}
                {this.state.submitted && (
                  <Button
                    className="buttonStyle"
                    variant="primary"
                    block
                    onClick={() => {
                      this.setState({ submitted: false });
                    }}
                  >
                    {" "}
                    Add Another Trip
                  </Button>
                )}
              </Col>
              <Col />
            </Row>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default TripForm;
