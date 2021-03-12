import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';
import "./logout.css";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
  } // end constructor

  logOutUser() {
    // Make a call to firebase authentication
    // this API will log the user out now.
    Firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Logout">
        <button onClick={this.logOutUser} className="logout-button">Logout</button>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default Logout;
