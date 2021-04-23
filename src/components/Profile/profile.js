import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Logout from "../Logout/logout";
import Login from "../Login/login";
class Profile extends Component {
render(){
    const authenticated = this.props.authenticated;
    
    return(
        <div> 
            {authenticated && <Logout/>}
            {!authenticated && <Login/>}
            
        </div>
    )     
    
}
}
export default Profile;