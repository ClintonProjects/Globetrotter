import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';
import "./forgotPass.css";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

class ForgotPass extends Component {
    constructor(props) {
      super(props);
      
  
      this.state = {
        
      };
    }
    render() {
        return (
            <div>Forgot password page</div>
        )}
}
export default ForgotPass;