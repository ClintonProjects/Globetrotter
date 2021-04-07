import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import "./NavBar.css";
import Firebase from "firebase/app";
import 'firebase/auth';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Logout from "../Logout/logout";
import Login from "../Login/login"
import Logo from './SLEEPY.png';
import logo from './logo/XS logo.png';



class NavBar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      notficitonBox: false,
      // notList: ["Notficiton #1", "Notficiton #2", "Notficiton #3"],
      // timelist: [8, 2, 1]
      notList: [],
      timelist: []
    };
    this.not = this.not.bind(this);
    this.notficitonBoxSettings = this.notficitonBoxSettings.bind(this);
  }

  not() {
    return this.state.notficitonBox;
  }

  notficitonBoxSettings() {
    if (this.state.notficitonBox == false)
      this.setState({ notficitonBox: true });
    else
      this.setState({ notficitonBox: false });
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
      <div id="bar" class="container-fluid">
        <div class="row" onClick={this.not}>
          <div class="col-sm-1 boradercover">
            <div className="logo">
              {!authenticated && (
                <Link to="/"><img src={logo} alt="Logo" className="icon" /></Link>
              )}
              {authenticated && (
                <Link to="/mapview"><img src={logo} alt="Logo" className="icon" /></Link>
              )}
            </div>
          </div>
          <div class="row col-sm-3" />
          <div class="row col-sm-4 boradercover">
            <div className="links">
              {!authenticated && (
                <Link className="nav-text" to="/">Home</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/mapview" >Home</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/">Map</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/mapview">Map</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/profile">Photo</Link>
              )}
              {authenticated && (
                <Link  className="nav-text"to="/uploadPhotos">Photo</Link>
              )}

              {!authenticated && (
                <Link className="nav-text" to="/profile">About</Link>
              )}
              {authenticated && (
                <Link className="nav-text" to="/about">About</Link>
              )}

            </div>
          </div>
          <div class="col-sm-2">
            <div class="rightsideLogos">
              <div class="marginleftright">
                {authenticated && (
                  <span> 
                    <Link to="/settings"><span><FaIcons.FaUser className="icon"/></span></Link>
                  
                  </span>)}
              </div>
              <div class="marginleftright">
                {authenticated && (
                  <span> <button onClick={this.notficitonBoxSettings}>
                    <FaIcons.FaBell className="icon"/>
                  </button>
                  </span>)}
              </div>
              <div class="marginleftright">
                <span>
                  <Link to="/profile"><span><FaIcons.FaSignOutAlt className="icon"/></span></Link>
                </span>
              </div>
            </div>
          </div>
        </div>




        {this.state.notficitonBox && 
          <div class="notbox">
            <div class="Insidenotbox">
              <div class="left-top-notbox">
                <b><div class="text-dark nottext">Notifications</div></b>
                {/* <b><span class="text-dark consize"> <FaIcons.FaCircle div class="green" /> Connected</span></b> */}
              </div>
              <div class="right-top-notbox" onClick={this.notficitonBoxSettings}>
                <FaIcons.FaRegTimesCircle class="xicon" />
              </div>
            </div>


            {this.state.notList.length == 0 &&
              < div class="not1">
                <FaIcons.FaRegTimesCircle div class="red" />
                <h6 class="not1text"><b>You have no Notficiton avaiable </b></h6>
                {/* <h6 class="not1text">{this.state.timelist[0]} Hours ago</h6> */}
              </div>
            }
            {this.state.notList.length == 0 &&
              < div class="not2">
                <img src={(Logo)} class="kirby"/>
              </div>
            }

            {this.state.notList.length > 0 &&
              < div class="not1">
                <FaIcons.FaRegTimesCircle div class="green" />
                <h6 class="not1text"><b>{this.state.notList[0]}</b></h6>
                <h6 class="not1text">{this.state.timelist[0]} Hours ago</h6>
              </div>
            }

            {this.state.notList.length > 1 &&
              <div class="not1">
                <FaIcons.FaRegTimesCircle div class="green" />
                <h6 class="not1text"><b>{this.state.notList[1]}</b></h6>
                <h6 class="not1text">{this.state.timelist[1]} Hours ago</h6>
              </div>
            }
            {this.state.notList.length > 2 &&
              <div class="not1">
                <FaIcons.FaRegTimesCircle div class="green" />
                <h6 class="not1text"><b>{this.state.notList[2]}</b></h6>
                <h6 class="not1text">{this.state.timelist[2]} Hours ago</h6>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default NavBar;
