import React, { Component } from "react";
import "./RegisterMessage.css";
import Map from './Map';
import Login from '../Login/login.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


export class RegisterMessage extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div class="col-12 loginMessage text-center">
        <Link className="logInMsg-nav-text" to="/profile">Login to unlock all features, Please Click to login</Link>
      </div>
    );
  }
}

export default RegisterMessage;
