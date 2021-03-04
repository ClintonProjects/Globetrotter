import React, { Component } from "react";
import Login from "./components/login/login";
import Logout from "./components/login/logout";
import Rego from "./components/login/rego";
import firebase from "./components/myFirebaseConfig";
import Firebase from 'firebase/app';
import About from "./components/about/About";
import ContactUs from "./components/contactUs/ContactUs";
import Help from "./components/help/Help";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            currentUser: null
        };
        this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
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
        
        //for importing data from our FIREBASE database
        let ref = Firebase.database().ref('');

        ref.on('value', (snapshot) => {
          // json array
          let msgData = snapshot.val();
          let newMessagesFromDB1 = [];
          for (let m in msgData) {
            // create a JSON object version of our object.
            let currObject = {
              id: msgData[m].id,
            };
            // add it to our newStateMessages array.
            newMessagesFromDB1.push(currObject);
          } // end for loop
          // set state
          this.setState({ users: newMessagesFromDB1 });
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
   
    render() {
        return (
        <div className="App"> 
            
            <Login/>
        </div>
        );
    }
}
export default App;
