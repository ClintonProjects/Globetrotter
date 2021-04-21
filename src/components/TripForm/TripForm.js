import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import ISO from "./names.json";
import "./TripForm.css";
import UploadPhotos from "../uploadPhotos/uploadPhotos.js";

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore(); // collection = users & user = evan

class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ${this.props.currentUser.uid} passed down from Landing.js file
      docRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid")),
        //.doc(`${this.props.currentUser.uid}`),
      locationRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        //.doc(`${this.props.currentUser.uid}`)
        .collection("locations"),
      tripRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        //.doc(`${this.props.currentUser.uid}`)
        .collection("trips"),
    };
    this.addData = this.addData.bind(this);
    this.getKeyByValue = this.getKeyByValue.bind(this);
  }
  // function that will add data to firestore
  addData(event) {
    // add try catch to prevent firestore error on invalid input
    try {
      event.preventDefault(); // prevent the form from actually submitting
      var country = document.getElementById("country");
      var startDate = document.getElementById("startdate");
      var endDate = document.getElementById("enddate");
      const docID = country.value;
      const userSeries = {
        location: {
          id: this.getKeyByValue(ISO, country.value),
          name: country.value,
          fill: `amd4color("#000")`,
        },
      };
      const userTrips = {
        tripInfo: {
          name: country.value,
          startDate: startDate.value,
          endDate: endDate.value,
        },
      };
      this.state.locationRef.doc(`${docID}`).set(userSeries);
      this.state.tripRef.doc(`${docID}`).set(userTrips);
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
  render() {
    return (
      <>
        <form className="trip-form" onSubmit={this.addData}>
          {/* onSubmit={()=> {this.addData; this.handleSubmission;} } */}
          <h1>Your Trip</h1>
          <div id="inputContainer">
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter Country"
            />
            <input
              type="text"
              id="startdate"
              name="startdate"
              placeholder="Enter Start Date"
            />
            <input
              type="text"
              id="enddate"
              name="enddate"
              placeholder="Enter End Date"
            />
          </div>
          <div id="buttonContainer">
            <input type="submit" id="submit" value="Submit" />
          </div>
        </form>


      </>

    );
  }
}

export default TripForm;
