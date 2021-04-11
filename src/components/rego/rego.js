import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';
import "./rego.css";
import {
    BrowserRouter as Router,
    Link,
    useHistory,
  } from "react-router-dom";

class Rego extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null
        }
    this.registerUser = this.registerUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    
    }
    //used to update any of the states
    handleInput(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    
    registerUser(e) {
        e.preventDefault();
        const { email, password } = this.state;
        //used from Firebase authentication documentation 
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
            console.log(email);
            this.props.history.push("/tripform") //opens the map upon successful registration
    })
    .catch((error) => {
        //if error occurs, push to error state
        this.setState({ error: error });
        console.log("error");
      });
    }
    render(){
        const {email, password, error} = this.state;
        const handleInput = this.handleInput;
        
        return(
            <div className="rego">
                <h3>Register</h3>
                {/* //display the error message to the user if they enter an invalid email or password */}
                {error && (<p>
                <strong>ERROR: {error.message} </strong>
                </p>
                )}
                <form onSubmit={this.registerUser} className="rego-form"> 
                    <div>
                        <label>Email: </label>
                        <input 
                            type="email"
                            onChange={handleInput}
                            name="email"
                            value={email}
                            className="rego-email">
                        </input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            onChange={handleInput}
                            name="password"
                            value={password}
                            className="rego-password">    
                        </input>
                    </div>
                    <div>
                        <button className="rego-button">Register</button>
                    </div>
                </form>
                {/* route to login page  */}

                <Link to="/login" id="loginLink"><u>Already have an account? Login</u></Link>
            </div>
        );
    }
}
export default Rego;