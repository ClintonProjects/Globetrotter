import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import ISO from "./names.json";

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore(); // collection = users & user = evan
const docRef = firestore.doc("users/evan"); // path to the document in fs

class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      country: "",
      startDate: "",
      endDate: "",
    };
    this.addData = this.addData.bind(this);
    this.getKeyByValue = this.getKeyByValue.bind(this);

  }
  // use componentDidMount as it is an API call and we have to wait for response
  componentDidMount() {
    /*
    docRef.get().then( (data) => {
      let json = data.data(); // .data() just accesses the data rather than file info aswell
      this.setState( { country: json.country } );
      console.log('fetch complete')
    });
    */
    // onSnapshot listens for any changes in the document on firebase
    docRef.onSnapshot((data) => {
      let json = data.data(); // .data() will access the doc not file info
      this.setState({ id: json.id });
      this.setState({ name: json.name });
      this.setState({ startDate: json.startDate });
      this.setState({ endDate: json.endDate });
    });
  }
  // function that will add data to firestore
  addData(event) {
    // add try catch to prevent firestore error on invalid input
    try {
      event.preventDefault(); // prevent the form from actually submitting
      var country = document.getElementById("country");
      var startDate = document.getElementById("startdate");
      var endDate = document.getElementById("enddate");
      const json = {
        // gets ISO for user chosen country
        id: this.getKeyByValue(ISO, country.value),
        name: country.value,
        startDate: startDate.value,
        endDate: endDate.value,
      };
      docRef.set(json); // possibly update
    } catch (error) {
      alert("invalid input");
      // console.error(error);
    }
  }
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].toLowerCase() === value.toLowerCase());
  }
  render() {
    return (
      <>
        <form class="trip-form" onSubmit={this.addData}>
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

        <br />
        {this.state.id}
        <br />
        {this.state.name}
        <br />
        {this.state.startDate}
        <br />
        {this.state.endDate}
        <br />
        <br />
      </>
    );
  }
}

export default TripForm;
