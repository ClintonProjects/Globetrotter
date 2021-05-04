import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';
import "./forgotPass.css";
import logo from "../NavBar/logo/fullLogoNew.png";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { Container, Form, Button, Row, Col} from 'react-bootstrap';

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
          <Container>
            <Row className="pt-5">
            <Col/>
            <Col className="col-4 register p-4">
            <img src={logo} alt="Logo" />
            <p className="h2 textColour text-center">Forgot password?</p>
            <p className="h6 textColour text-center pb-2">Enter the email associated with your account. We'll send you a reset link.</p>
            {/* //display the error message to the user if they enter an invalid email or password */}
            {error && (<p> <strong className="text-danger">ERROR: {error.message} </strong> </p>)}
            {this.state.message ? <p className="h6 textColour text-center pb-2">"Check your email inbox for further instructions"</p> : null}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="formTextColour">Email address</Form.Label>
                <Form.Control id="Email"  name="email" type="email" placeholder="Enter email" value={email} onChange={handleInput}/>
              </Form.Group>

              <Button className="buttonStyle" variant="primary" type="submit" block>
              SUBMIT
              </Button>
            </Form>
            {/* route to login page  */}
            <Link className="float-left pt-1" id="RegLink" to= "/login" ><u>Back to login page</u></Link>
            </Col>
            <Col/>
            </Row>
          </Container>
        )}
}
export default ForgotPass;