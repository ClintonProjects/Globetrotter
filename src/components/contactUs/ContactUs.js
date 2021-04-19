import React, { Component } from "react";
import "./ContactUs.css";

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
    alert('Your request has been successful');
    event.preventDefault();
  }

  render() {
    return (
        
      <div className="content1">
        <h3> Contact us </h3>
        <br/><br/>
        <h5> Submit a request: </h5>
        <form onSubmit={this.handleSubmit} className="form1">
          <label>
          Your email address:
            <br/>
            <input type="text" className="input1" value={this.state.email} onChange={this.handleChangeEmail} />
          </label>
          <br/>
          <label>
          Subject:
            <br/>
            <input type="text" value={this.state.subject} onChange={this.handleChangeSubject} />
          </label>
          <br/>
          <label>
          Description:
            <br/>
            <textarea value={this.state.description} onChange={this.handleChangeDescription} />
          </label>


          <br/><br/>
          <input type="submit" value="Submit" />
        </form>
            
            
      </div>
    );
  }
}
export default ContactUs;