import React, { Component } from "react";
import Login from "./components/login/login";
import Logout from "./components/login/logout";
import firebase from './components/myFirebaseConfig.js';
import Firebase from 'firebase';
import 'firebase/database';
// import Settings from " ";
import About from "./components/about/About";
import ContactUs from "./components/contactUs/ContactUs";
import Help from "./components/help/Help";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countryList: [],
            emailData: [],
            authenticated: false,
            currentUser: null
        };
        this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
        this.addItemToEmails = this.addItemToEmails.bind(this);
    }
    async componentDidMount() {
      try {
        this.getMessagesFromDatabase();
      } catch (error) {
        console.log(error);
        this.setState({ errorMsg: error });
      } // end of try catch
    } // end of componentDidMount()
    getMessagesFromDatabase() {
        //download and create json array of product data
        let ref = Firebase.database().ref('country_list');

        ref.on('value', (snapshot) => {
          // json array
          let msgData = snapshot.val();
          let newMessagesFromDB1 = [];
          for (let m in msgData) {
            // create a JSON object version of our object.
            let currObject = {
              country: msgData[m].country,
            };
            // add it to our newStateMessages array.
            newMessagesFromDB1.push(currObject);
          } // end for loop
          // set state
          this.setState({ countryList: newMessagesFromDB1 });
        });
    }
     //check if user is authenticated,
  // if they are set to true, otherwise false
  // currentUser holds the user object (if logged on)
  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState(() => ({
            authenticated: true,
            currentUser: user
          }))
        : this.setState(() => ({
            authenticated: false,
            currentUser: null
          }));
    });
  }
    /* append a new email address to the JSON array in firebase */
  addItemToEmails(address) {
    // get the current state array for emails
    let localEmails = this.state.emailData;

    // generate a new ID (no validation on this.)
    let addressId = String(this.state.emailData.length + 1);

    // combine id and address for new object to be added
    let newAddressObj = {
      id: addressId,
      address: address,
    };

    // append the new object to the local array
    localEmails.push(newAddressObj);

    // overwrite the emails array in firebase
    Firebase.database().ref('emails').set(localEmails);

    // update state with the list
    this.setState({ emailData: localEmails });
  }
    render() {
        return (
        <div className="App">

            {/*<Help/>*/}
            <ContactUs/>
            <br/>
            {/*<About/>*/}

        </div>
        );
    }
}
export default App;
