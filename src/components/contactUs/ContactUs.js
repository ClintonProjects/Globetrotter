import React, { Component } from "react";
import "./ContactUs.css";
import { Container, Form, Button, Row, Col} from 'react-bootstrap';

class ContactUs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      description: ''};

    //binding the event handler methods
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangeSubject(event) {
    this.setState({subject: event.target.value});
  }
  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    alert('An email was submitted: ' + this.state.email + ' with subject: ' + this.state.subject + 
    ' with description: ' + this.state.description);
    event.preventDefault();
  }

  render() {
    const { email, subject, description } = this.state;
    return (
      <Container>
            <Row className="pt-5">
            <Col/>
            <Col className="col-8 contactUs p-4">
            <p className="h2 ">Contact us</p>
            <hr className="textColour"/>
            <p className="h5 pb-2">Submit a request:</p>
           <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Your email address:</Form.Label>
                <Form.Control id="EmailContact"  name="email" type="email" value={email} onChange={this.handleChangeEmail}/>
              </Form.Group>
              <Form.Group controlId="formSubject">
                <Form.Label>Subject:</Form.Label>
                <Form.Control id="SubjectContact"  name="subject" type="input" value={subject} onChange={this.handleChangeSubject}/>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={5} id="DescriptionContact"  name="description" value={description} onChange={this.handleChangeDescription} />
              </Form.Group>
              <Button className="buttonStyle" variant="primary" type="submit" block>
              SUBMIT
              </Button>
            </Form>
            </Col>
            <Col/>
            </Row>
      </Container>
    );
  }
}
export default ContactUs;