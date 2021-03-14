import React, { Component } from "react";
import "./TripForm.css";

class TripForm extends Component {

  const getValue = () => {
    let country = document.getElementById("country").value;
    let date = document.getElementById("date").value;
    console.log(country);
    console.log(date);
  };
  
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
