import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import "./NavBar.css";
import Firebase from "firebase/app";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Logo from './SLEEPY.png';
import logo from './logo/logo_final_full.png';
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
      notificationboxList: [],
      timelist: [],
    }
    this.notificationbox = this.notificationbox.bind(this);
    this.notficitonBoxSettings = this.notficitonBoxSettings.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.getUserNotifications = this.getUserNotifications.bind(this);
    this.closeNotificationBox = this.closeNotificationBox.bind(this);

  }

  notificationbox() {
    return this.state.notficitonBox;
  }

  getUserNotifications = () => {
  }

  componentDidMount() {
    const firestore = firebase.firestore().collection('users').doc(localStorage.getItem("uid"));

    let jsonSplit;
    firestore.onSnapshot((data) => {
      try {
        let json = JSON.stringify(data.data());
        jsonSplit = JSON.parse(json);
        console.log(jsonSplit.notifications);
        let list = jsonSplit.notifications;
        list = list.reverse();
        this.setState({ notificationboxList: list });
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
    var list = this.state.notificationboxList;
    console.log(list);
    var removeitem = list[item];
    console.log(item);
    list = list.filter(item => item !== removeitem);
    console.log(list);
    this.setState({ notificationboxList: list });
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

  closeNotificationBox = () => {
    console.log("close notifcaitons");
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

    return (
      <div id="bar" className="container-fluid" >
        <div className="row">
          <div className="col-sm-1 boradercover">
            <div className="logo icon_nav_logo" onClick={() => this.closeNotificationBox()}>
              {!authenticated && (
                <Link to="/" onClick={this.props.picNoBack}><img src={logo} alt="Logo" className="icon icon_nav_logo" /></Link>
              )}
              {authenticated && (
                <Link to="/mapview" onClick={this.props.picNoBack}><img src={logo} alt="Logo" className="icon icon_nav_logo" /></Link>
              )}
            </div>
          </div>
          <div className="row col-sm-3" />
          <div className="row col-sm-4 boradercover">
            <div className="links linkFont" onClick={() => this.closeNotificationBox()}>
              {!authenticated && (
                <Link className="nav-text" to="/login" onClick={this.props.picBack}>Map</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/mapview" onClick={this.props.picNoBack} >Map</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/login" onClick={this.props.picBack}>Trips</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/tripform" onClick={this.props.picBack}>Trips</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/login" onClick={this.props.picBack}>Photo</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/gallery" onClick={this.props.picBack}>Photo</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/about" onClick={this.props.picBack}>About</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/about" onClick={this.props.picBack}>About</Link>
              )}
            </div>
          </div>
          <div className="col-sm-2">
            <div className="rightsideLogos">
              <div className="marginleftright">
                {authenticated && (
                  <span>
                    <Link to="/settings"><span><FaIcons.FaUser className="icon" onClick={this.props.picBack} /></span></Link>

                  </span>)}
              </div>
              <div className="marginleftright">
                {authenticated && (
                  <span> <button onClick={this.notficitonBoxSettings}>
                    <FaIcons.FaBell className="icon" />
                  </button>
                  </span>)}
              </div>
              <div className="marginleftright">
                {authenticated && (
                  <span>
                    <Link to="/logout"><span><FaIcons.FaSignOutAlt className="icon" onClick={this.props.picBack} /></span></Link>
                  </span>)}
              </div>
            </div>
          </div>
        </div>

        {
          this.state.notficitonBox && (
            <div className="notificationbox">
              {this.state.notificationboxList.length >= 1 && (
                <div className="notificationbox1">
                  <h6 className="notificationbox1text">
                    <button className="red" onClick={() => this.notficitonBoxSettings()}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                    <div class="space Notificationstext">Notifications:</div>
                  </h6>
                  {/* <h6 className="not1text">{this.state.timelist[1]} Hours ago</h6> */}
                </div>
              )}


              {this.state.notificationboxList.length == 0 && (
                <div className="notificationbox1noavaiable">
                  <button className="rednoavaiable" onClick={() => this.notficitonBoxSettings()}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                  <h6 className="notificationbox1textnoavaiable">
                    <b>You have no notifications available </b>
                  </h6>
                  {/* <h6 className="notificationbox1text">{this.state.timelist[0]} Hours ago</h6> */}
                </div>
              )}
              {this.state.notificationboxList.length == 0 && (
                <div className="notificationbox2">
                  <img src={Logo} className="kirby" />
                </div>
              )}

              {this.state.notificationboxList.length >= 1 && (
                <div className="notificationbox1">
                  <h6 className="notificationbox1text">
                    <button className="green" onClick={() => this.removeItem(0)}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                    <div class="space">{this.state.notificationboxList[0]}</div>
                  </h6>
                  {/* <h6 className="not1text">{this.state.timelist[0]} Hours ago</h6> */}
                </div>
              )}

              {this.state.notificationboxList.length >= 2 && (
                <div className="notificationbox1">
                  <h6 className="notificationbox1text">
                    <button className="green" onClick={() => this.removeItem(1)}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                    <div class="space">{this.state.notificationboxList[1]}</div>
                  </h6>
                  {/* <h6 className="not1text">{this.state.timelist[1]} Hours ago</h6> */}
                </div>
              )}

              {this.state.notificationboxList.length >= 3 && (
                <div className="notificationbox1">
                  <h6 className="notificationbox1text">
                    <button className="green" onClick={() => this.removeItem(2)}><FaIcons.FaRegTimesCircle ></FaIcons.FaRegTimesCircle></button>
                    <div class="space">{this.state.notificationboxList[2]}</div>
                  </h6>
                  {/* <h6 className="not1text">{this.state.timelist[2]} Hours ago</h6> */}
                </div>
              )}
            </div>
          )
        }
      </div >
    );
  }

}



export default NavBar;
