import React, { Component } from "react";
import { Container, Form, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import Firebase from "firebase/app";
import 'firebase/auth';
import "./rego.css";
import logo from "../NavBar/logo/fullLogoNew.png";
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
            //this.props.history.push("/tripform") //opens the map upon successful registration
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
        <Container >
        <Row className="pt-5">
          <Col/>
          <Col className="col-4 register p-4">
              <span><img src={logo} alt="Logo" /></span>

        <p className="h1 textColour text-center">Get on board!</p>
        <p className="h6 textColour text-center pb-2">Please register an account here!</p>
        {/* //display the error message to the user if they enter an invalid email or password */}
        {error && (
          <p> <strong className="text-danger">ERROR: {error.message} </strong> </p>
        )}
      <Form onSubmit={this.registerUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="formTextColour">Email address</Form.Label>
          <Form.Control id="Email"  name="email" type="email" placeholder="Enter email" value={email} onChange={handleInput}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="formTextColour">Password</Form.Label>
          <Form.Control id="Password" name="password" type="password" value={password} onChange={handleInput} placeholder="Password" />
        </Form.Group>
        <Button className="buttonStyle" variant="primary" type="submit" block>
        REGISTER
        </Button>
      </Form>
        {/* route to login page  */}
        <Link className="float-left pt-1" id="LoginLink" to="/login"><u>Already have an account? Login</u></Link>
        </Col>
        <Col/>
        </Row>


        </Container>
        );
    }
}
export default Rego;