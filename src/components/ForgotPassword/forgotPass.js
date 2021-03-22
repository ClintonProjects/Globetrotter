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
        email: "",
        error: null,
        message: false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event){
      
      event.preventDefault(); //stop default behaviour and allow our error checking
      const { email } = this.state;
      this.setState({message: false})
      Firebase.auth().sendPasswordResetEmail(email)
      .then((user)=>{
        console.log("email sent");
        this.setState({message: true});
         
      })
      .catch((error) => {
        this.setState({ error: error });
      })
      
    }
    render() {
      const email = this.state.email;
      const error = this.state.error;
      
      const handleInput = this.handleInputChange;
      const handleSubmit = this.handleSubmit;
        return (
          <div id = "forgotpasswordcon" className="forgotPassword">
            <h3>Forgot Password</h3>
            {error && (<p><strong>ERROR: {error.message} </strong></p>)}
            {this.state.message ? "Check your email inbox for further instructions" : null}
            <form onSubmit={handleSubmit} id="passForm">
              <input 
                type="email"
                name="email" 
                className="passEmail" 
                placeholder="Enter email address" 
                value={email}
                onChange={handleInput}
              ></input>
              <button>Submit</button>
            </form>
            
            <br></br>
            <Link to="/login" id="backtologin"><u>Back to login page</u></Link>
          </div>
        )}
}
export default ForgotPass;