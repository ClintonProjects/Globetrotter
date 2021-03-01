import React, { Component } from "react";
import Firebase from "firebase";

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
      <div className="Login" style={{ height: '900px', width: '1000px' }}>
        <h3>Sign In</h3>
        {error && (
          <p>
            <strong>ERROR: {error.message} </strong>
          </p>
        )}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email address: </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInput}
            />
          </div>
          <button> Login </button>
          </form>
      </div>
    );
  }
}
export default Login;