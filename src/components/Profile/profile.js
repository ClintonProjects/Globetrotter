import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Logout from "../Logout/logout";
import Login from "../Login/login"
;
class Profile extends Component {
render(){
    const authenticated = this.props.authenticated;
    const currentUser = this.props.currentUser;
    return(
        <div> 
            {currentUser !== null && (
            <i>Logged on as {this.props.currentUser.email}</i>)}
            {authenticated && <Logout/>}
            {!authenticated && <Login/>}
            
        </div>
    )     
    
}
}
export default Profile;