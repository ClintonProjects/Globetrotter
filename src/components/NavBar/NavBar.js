import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import "./NavBar.css";
import Firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Logout from "../Logout/logout";
import Login from "../Login/login"
import Logo from './SLEEPY.png';
import logo from './logo/fullLogoNew.png';
import firebase from "firebase/app";
import 'firebase/firestore';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

      notficitonBox: false,
      //     notList: ["Notficiton #1", "Notficiton #2", "Notficiton #3"],
      //     timelist: [8, 2, 1]
      userId: localStorage.getItem("uid"),
      notList: [],
      timelist: [],
    }
    this.not = this.not.bind(this);
    this.notficitonBoxSettings = this.notficitonBoxSettings.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.getUserNotifications = this.getUserNotifications.bind(this);

    // this.setState({ userId: id});
  }

  not() {
    return this.state.notficitonBox;
  }

  //can use localStorage.getItem("uid") for the uid
  //works on every page after the user logs in
  getUserId() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        let String = user.uid;
        this.setState({ userId: String });
        console.log(String);
      } else
        console.log("empty");
    });
  }


  getUserNotifications = () => {
    const firestore = firebase.firestore().collection('users').doc(localStorage.getItem("uid"));
    const notPath = firebase.firestore().collection('users').doc(localStorage.getItem("uid")).get("notifications");
    console.log(this.state.userId);
    let jsonSplit;
    firestore.onSnapshot((data) => {
      try {
        let json = JSON.stringify(data.data());
        jsonSplit = JSON.parse(json);
        console.log(jsonSplit.notifications);
        this.setState({ notList: jsonSplit.notifications });
        return
      } catch (exp) {
        firebase.firestore().collection('users').doc(localStorage.getItem("uid")).set({ notifications: [] });
        return
      }
    });
    return;
  }




  removeItem = (item) => {
    console.log("remove item");
    var list = this.state.notList;
    console.log(list);
    var removeitem = list[item];
    console.log(item);
    list = list.filter(item => item !== removeitem);
    console.log(list);
    this.setState({ notList: list });
    firebase.firestore().collection('users').doc(localStorage.getItem("uid")).update({ notifications: list });
    return;
  }


  notficitonBoxSettings() {
    if (this.state.notficitonBox == false) {
      this.getUserNotifications();
      this.setState({ notficitonBox: true });
    }
    else this.setState({ notficitonBox: false });
  }

  notfalse() {
    this.setState({ notficitonBox: false });
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const notficitonBoxSettings = this.props.notficitonBoxSettings;
    // const removeItem = this.props.removeItem;
    const authenticated = this.props.authenticated;
    const currentUser = this.props.currentUser;
    const notfalse = this.props.notfalse;

    return (
      <div id="bar" className="container-fluid" >
        <div className="row">
          <div className="col-sm-1 boradercover" onClick="notfalse()">
            <div className="logo">
              {!authenticated && (
                <Link to="/"><img src={logo} alt="Logo" className="icon" /></Link>
              )}
              {authenticated && (
                <Link to="/mapview"><img src={logo} alt="Logo" className="icon" /></Link>
              )}
            </div>
          </div>
          <div className="row col-sm-3" />
          <div className="row col-sm-4 boradercover">
            <div className="links" onClick="notfalse()">
              {!authenticated && (
                <Link className="nav-text" to="/login">Map</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/mapview" >Map</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/login">Trips</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/tripform">Trips</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/login">Photo</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/uploadPhotos">Photo</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/about">About</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/about">About</Link>
              )}
            </div>
          </div>
          <div className="col-sm-2">
            <div className="rightsideLogos">
              <div className="marginleftright" onClick="notfalse()">
                {authenticated && (
                  <span>
                    <Link to="/settings"><span><FaIcons.FaUser className="icon" /></span></Link>

                  </span>)}
              </div>
              <div className="marginleftright">
                {authenticated && (
                  <span> <button onClick={this.notficitonBoxSettings}>
                    <FaIcons.FaBell className="icon" />
                  </button>
                  </span>)}
              </div>
              <div className="marginleftright" onClick="notfalse()">
                {authenticated && (
                  <span>
                    <Link to="/logout"><span><FaIcons.FaSignOutAlt className="icon" /></span></Link>
                  </span>)}
              </div>
              {/* <div className="marginleftright">
              {authenticated && (
              <small>
                Logged on as {localStorage.getItem("email")}
              </small> )}
              </div>  */}
            </div>
          </div>
        </div>

        {this.state.notficitonBox && (
          <div className="notbox">
            {this.state.notList.length >= 1 && (
              <div className="not1">
                <h6 className="not1text">
                  <button className="red" onClick={() => this.notficitonBoxSettings()}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                  <div class="space Notificationstext">Notifications:</div>
                </h6>
                {/* <h6 className="not1text">{this.state.timelist[1]} Hours ago</h6> */}
              </div>
            )}


            {this.state.notList.length == 0 && (
              <div className="not1noavaiable">
                <button className="rednoavaiable" onClick={() => this.notficitonBoxSettings()}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                <h6 className="not1textnoavaiable">
                  <b>You have no notifications available </b>
                </h6>
                {/* <h6 className="not1text">{this.state.timelist[0]} Hours ago</h6> */}
              </div>
            )}
            
            {this.state.notList.length == 0 && (
              <div className="not2">
                <img src={Logo} className="kirby" />
              </div>
            )}

            {this.state.notList.length > 0 && (
              <div className="not1">
                <h6 className="not1text">
                  <button className="green" onClick={() => this.removeItem(0)}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                  <div class="space">{this.state.notList[0]}</div>
                </h6>
                {/* <h6 className="not1text">{this.state.timelist[0]} Hours ago</h6> */}
              </div>
            )}

            {this.state.notList.length > 1 && (
              <div className="not1">
                <h6 className="not1text">
                  <button className="green" onClick={() => this.removeItem(1)}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                  <div class="space">{this.state.notList[0]}</div>
                </h6>
                {/* <h6 className="not1text">{this.state.timelist[1]} Hours ago</h6> */}
              </div>
            )}

            {this.state.notList.length > 2 && (
              <div className="not1">
                <h6 className="not1text">
                  <button className="green" onClick={() => this.removeItem(2)}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                  <div class="space">{this.state.notList[0]}</div>
                </h6>
                {/* <h6 className="not1text">{this.state.timelist[2]} Hours ago</h6> */}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

}



export default NavBar;
