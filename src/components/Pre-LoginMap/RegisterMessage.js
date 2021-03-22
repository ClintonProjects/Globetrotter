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
      <div className="col-12 loginMessage bg-danger text-white warning-borader text-center">
        <Link to="/login">Login to unlock all featrues, Please Click to login</Link>
      </div>
    );
  }
}

export default RegisterMessage;