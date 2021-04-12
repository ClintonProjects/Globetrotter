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
      // notList: ["Notficiton #1", "Notficiton #2", "Notficiton #3"],
      // timelist: [8, 2, 1]
      notList: [],
      timelist: [],
    };
    this.not = this.not.bind(this);
    this.notficitonBoxSettings = this.notficitonBoxSettings.bind(this);
  }

  not() {
    return this.state.notficitonBox;
  }

  getUserId() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        let String = user.uid;
        this.setState({ userId: String });
      } else
        console.log("empty");
    });
  }

  getUserNotifications = () => {
    const firestore = firebase.firestore().collection('users').doc(this.state.userId);
    let jsonSplit;

    firestore.onSnapshot((data) => {
      let json = JSON.stringify(data.data());
      jsonSplit = JSON.parse(json);
      this.setState({ notList: jsonSplit.notList });
      // this.setState({ timelist: jsonSplit.notificationsTime });
    });
    // this.removeUserNotifications();
  }

  removeUserNotifications() {
    let newList = this.state.notList;
    console.log(newList);
    // if (newList.includes("not1")) {
    let id = newList.includes("not1");
    console.log(id);
    // let returnlist = [];
    // returnlist.push(newList.splice(0, id), newList.splice(1, this.state.notList.length));
    // console.log("return list: " + returnlist);
    //}
  }




  notficitonBoxSettings() {
    if (this.state.notficitonBox == false)
      this.setState({ notficitonBox: true });
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
    const not = this.props.not;
    const authenticated = this.props.authenticated;
    const currentUser = this.props.currentUser;
    const notfalse = this.props.notfalse;

    return (
      <div id="bar" className="container-fluid">
        <div className="row">
          <div className="col-sm-1 boradercover">
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
                <Link className="nav-text" to="/">Map</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/mapview" >Map</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/profile">Trips</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/tripform">Trips</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/profile">Photo</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/uploadPhotos">Photo</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/profile">About</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/about">About</Link>
              )}
            </div>
          </div>
          <div className="col-sm-2">
            <div className="rightsideLogos">
              <div className="marginleftright">
                {authenticated && (
                  <span>
                    <Link to="/settings"><span><FaIcons.FaUser className="icon" /></span></Link>

                  </span>)}
              </div>
              <div className="marginleftright">
                {authenticated && (
                  <span> <button onClick={this.notficitonBoxSettings}>
                    <FaIcons.FaBell className="icon"/>
                  </button>
                  </span>)}
              </div>
              <div className="marginleftright">
                <span>
                  <Link to="/profile"><span><FaIcons.FaSignOutAlt className="icon" /></span></Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {this.state.notficitonBox && (
          <div className="notbox">
            <div className="Insidenotbox">
              <div className="left-top-notbox">
                <b>
                  <div className="text-dark nottext">Notifications</div>
                </b>
                {/* <b><span className="text-dark consize"> <FaIcons.FaCircle div className="green" /> Connected</span></b> */}
              </div>
              <div
                className="right-top-notbox"
                onClick={this.notficitonBoxSettings}
              >
                <FaIcons.FaRegTimesCircle className="xicon" />
              </div>
            </div>

            {this.state.notList.length == 0 && (
              <div className="not1">
                <FaIcons.FaRegTimesCircle div className="red" />
                <h6 className="not1text">
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
                <FaIcons.FaRegTimesCircle div className="green" />
                <h6 className="not1text">
                  <b>{this.state.notList[0]}</b>
                </h6>
                <h6 className="not1text">{this.state.timelist[0]} Hours ago</h6>
              </div>
            )}

            {this.state.notList.length > 1 && (
              <div className="not1">
                <FaIcons.FaRegTimesCircle div className="green" />
                <h6 className="not1text">
                  <b>{this.state.notList[1]}</b>
                </h6>
                <h6 className="not1text">{this.state.timelist[1]} Hours ago</h6>
              </div>
            )}
            {this.state.notList.length > 2 && (
              <div className="not1">
                <FaIcons.FaRegTimesCircle div className="green" />
                <h6 className="not1text">
                  <b>{this.state.notList[2]}</b>
                </h6>
                <h6 className="not1text">{this.state.timelist[2]} Hours ago</h6>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
