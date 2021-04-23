import React, { Component } from "react";
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import Firebase from "firebase/app";
import 'firebase/auth';
import "./login.css";
import logo from "../NavBar/logo/fullLogoNew.png";
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
        //this.props.history.push("/mapview");//redirect logged in user to correct path
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
      <Container >
       <Row className="pt-5">
          <Col/>
          <Col className="col-4 register p-4">
          <img src={logo} alt="Logo" />
          <p className="h2 textColour text-center">Welcome back!</p>
          <p className="h6 textColour text-center pb-2">Please login to your account</p>
          {/* //display the error message to the user if they enter an invalid email or password */}
          {error && (
            <p> <strong className="text-danger">ERROR: {error.message} </strong> </p>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="formTextColour">Email address</Form.Label>
              <Form.Control id="Email" name="email" type="email" placeholder="Enter email" value={email} onChange={handleInput}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="formTextColour">Password</Form.Label>
              <Form.Control id="Password" name="password" type="password" value={password} onChange={handleInput} placeholder="Password" />
            </Form.Group>
            <Button className="buttonStyle" variant="primary" type="submit" block>
            LOGIN
            </Button>
          </Form>
          {/* route to login page  */}
          <Link className="float-left pt-1" id="RegLink" to= "/register" ><u>Register new account.</u></Link>
          <Link className="float-right pt-1" id="ForgotPassLink" to="/forgotPass" ><u>Forgot Password?</u></Link>
          </Col>
          <Col/>
        </Row>
      </Container>
    );
  }
}
export default Login;