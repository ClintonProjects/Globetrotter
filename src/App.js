import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Rego from "./components/rego/rego";
import ContactUs from "./views/ContactUs/ContactUs";
import firebase from "./components/myFirebaseConfig";
import Firebase from 'firebase/app';
import About from "./components/about/About";
import Logout from "./components/Logout/logout.js";
import MapView from "./views/MapView/MapView.js";
import Preloginmap from "./views/PreLoginMap/Preloginmap";
import Login from "./components/Login/login.js";
import { createHashHistory } from 'history';
import ForgotPass from "./components/ForgotPassword/forgotPass.js";
import NavBar from "./components/NavBar/NavBar.js";
import UploadPhotos from "./components/uploadPhotos/uploadPhotos.js";
import Footer from "./components/footer/Footer.js";
import Profile from "./components/Profile/profile.js"
// import MapView from "./views/MapView/MapView";

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
      <div>
        <Router>
          <NavBar/>
          <Switch>
            <Route path="/" component={Preloginmap} exact/>
            <Route path="/about" component={About}/>
            <Route path="/mapview" component={MapView}/> 
            <Route path="/preloginmap" component={Preloginmap}/> 
            <Route path="/contactus" component={ContactUs}/> 
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/rego" component={Rego}/>
            <Route path="/forgotPass" component={ForgotPass}/>
            <Route path="/uploadPhotos" component={UploadPhotos}/>
            <Route path="/profile" render={() => (<Profile
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
            />)}/>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
   
    // render() {
    //     return (
    //     <div>
    //         {this.state.currentUser !== null && (
    //           <i>Logged on as {this.state.currentUser.email}</i>
    //         )}{/*just there for testing purposes currently*/}
    //         {this.state.authenticated && <MapView/>}
    //         {this.state.authenticated && <Logout/>}{/*just here while routing not working*/}
    //         {!this.state.authenticated && <User/>}{/*just here while routing not working - with routing will be to PreLogInView*/}
    //     </div>
    //     );
    // }
}
export default App;
