import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';
import "./login.css";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //when user submits, it takes the state email and password and
    // sends to firebase auth and signin functions
    event.preventDefault(); //stop default behaviour and allow our error checking
    const { email, password } = this.state;
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // once successfully authenticated set state in the Parent
        // for the authenticated variable.
        console.log("User logged on");
        this.props.history.push("/mapview");//redirect logged in user to correct path
      })
      .catch((error) => {
        //if error occurs, push to error state
        this.setState({ error: error });
        
      });
  }

  render() {
    const { email, password, error } = this.state;
    const handleInput = this.handleInputChange;
    return (
      <div className="login" >
        <h2>Welcome back</h2>
        <h3>Sign In to log your most recent trip</h3>
        {error && (
          <p>
            <strong>ERROR: {error.message} </strong>
          </p>
        )}
        <form onSubmit={this.handleSubmit} className="login-form">
          <div>
            <label>Email address: </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              className="login-email"
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInput}
              className="login-password"
            />
          </div>
          <button className="login-button"> Login </button>
          
        </form>
        {/* route to rego or forgot password pages  */}
        <Link to= "/register" id="regoLink"><u>Don't have an account? Register</u></Link>
        <Link to="/forgotPass" id="passLink"><u>Forgot Password?</u></Link>
      </div>
    );
  }
}
export default Login;