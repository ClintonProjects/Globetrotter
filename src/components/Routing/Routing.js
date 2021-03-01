import React, { Component } from "react";
import './Footer.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export class Routing extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
              <div className="App">
        <Router>
          <div>
            <Switch>
              <Route path="/about" component={Footer}>
              </Route>
              <Route path="/login" component={Login}>
              </Route>
              <Route path="/">
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Routing;