import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore(); // collection = users & user = evan
const docRef = firestore.doc("users/evan"); // path to the document in fs

class TripForm extends Component {
  render() {
    return (
      <form class="trip-form">
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
    );
  }
}

export default TripForm;
