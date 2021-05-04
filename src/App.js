import React, { Component } from "react";
import { Container, Row} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Rego from "./components/rego/rego";
import ContactUs from "./components/contactUs/ContactUs";
import firebase from "./components/myFirebaseConfig";
import Firebase from "firebase/app";
import About from "./components/about/About";
import Logout from "./components/Logout/logout.js";
import MapView from "./views/MapView/MapView.js";
import Preloginmap from "./views/PreLoginMap/Preloginmap";
import Login from "./components/Login/login.js";
import { createHashHistory } from "history";
import ForgotPass from "./components/ForgotPassword/forgotPass.js";
import NavBar from "./components/NavBar/NavBar.js";
import Gallery from "./components/photoGallery/gallery.js";
import TripForm from "./components/TripForm/TripForm.js";
import Footer from "./components/footer/Footer.js";
import Settings from "./components/settings/Settings.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picBackground: false,
      authenticated: false,
      currentUser: null,
    };
  }
  //check if user is authenticated,
  // if they are set to true, otherwise false
  // currentUser holds the user object (if logged on)
  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.setState(() => ({
          authenticated: true,
          currentUser: user,
        }))
        : this.setState(() => ({
          authenticated: false,
          currentUser: null,
        }));
    });
  }

  /*change the css class based on browser location*/
  enablePicBackground = () => {
    this.setState({picBackground: true});
  }
  /*change the css class based on browser location*/
  disablePicBackground = () => {
    this.setState({picBackground: false});
  }

  render() {
    if (this.state.authenticated) {
      localStorage.setItem("uid", this.state.currentUser.uid);
      localStorage.setItem("email", this.state.currentUser.email);
    }
    //else localStorage.setItem("uid", "K26KJF569YU6gNaIZOySCG6uoGB2");
    // prevents error when /mapview is directly typed into the url

    //extract url information from browser (https://stackoverflow.com/a/52732656)
    //let location = window.location.pathname;
    return (
      
      <div className={this.state.picBackground ? "pictureBackground" : "whiteBackground"}>
      <Container fluid className="content">
        <Router>
          <Row>
            <NavBar authenticated={this.state.authenticated} 
            picBack={this.enablePicBackground}  picNoBack={this.disablePicBackground}/>
          </Row>
          <Row>
            <Switch>
              <Route path="/" exact 
                render={() => (
                  <Preloginmap picBack={this.enablePicBackground}  picNoBack={this.disablePicBackground}/>
                )}
              />
              <Route path="/about" 
              render={() => (
                <About picBack={this.enablePicBackground}  picNoBack={this.disablePicBackground}/>
              )}/>
              <Route
                path="/mapview"
                render={() => (
                  <MapView
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
              <Route path="/preloginmap" component={Preloginmap} />
              <Route path="/contactus" component={ContactUs} />
              <Route path="/login" render={() => (
                <Login
                picBack={this.enablePicBackground}  picNoBack={this.disablePicBackground}
                  authenticated={this.state.authenticated}
                />
              )} />
              <Route
                path="/tripform"
                render={() => (
                  <TripForm
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
              <Route path="/logout"
                render={() => (
                  <Logout
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser} 
                    picBack={this.enablePicBackground}  picNoBack={this.disablePicBackground}/>
                )} />
              <Route path="/register" 
                render={() => (
                  <Rego
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser} />
                )} />
              <Route path="/forgotPass" component={ForgotPass} />
              <Route path="/settings" component={Settings} />
              <Route
                path="/gallery"
                render={() => (
                  <Gallery
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser}
                  />
                )}
              />
              
            </Switch>
          </Row>
          <Row>
            <Footer currentUser={this.state.currentUser} />
          </Row>
        </Router>
        </Container>
        </div>
    );
  }
}
export default App;
