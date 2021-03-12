import React, { Component } from "react";
import "./RegisterMessage.css";
import Map from './Map';
// import cat from './src/';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export class RegisterMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div class="row text-center ">
        <div class="col-sm-12 loginMessage bg-danger text-white warning-borader">
          <Router>
            <Switch>
              <h5>Register to unlock all featrues, Please login Click to login </h5>
            </Switch>
          </Router>
        </div>
        <Router>
          <Switch>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RegisterMessage;