import React, { Component } from "react";
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";
//import "./Settings.css";

class Settings extends Component {
  render() {
    return (
      <Container>
      <Row>
      <Col/>
      <Col className="col-8 contactUs p-4">
      <p className="h2 ">Personal Information</p>
      <hr className="textColour"/>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control id="NameSettings"  name="Name" type="input" value={""}/>
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday (DD/MM/YYYY):</Form.Label>
          <Form.Control id="BirthdaySettings"  name="birthday" type="input" value={""}/>
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Gender (F/M):</Form.Label>
          <Form.Control id="GenderSettings"  name="gender" type="input" value={""}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control id="EmailSettings" className="whiteBackground" name="email" type="email" value={""}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Row className="pb-3">
              <Col>
                <Form.Control id="PasswordSettings" className="whiteBackground" name="password" type="password" value={""}/>
              </Col>
              <Col>
                <Button variant="outline-info" type="submit" block>
                CHANGE PASSWORD
                </Button>
              </Col>
          </Form.Row>
        </Form.Group>

        <Button className="buttonStyle" variant="primary" type="submit" block>
        UPDATE
        </Button>
      </Form>
      </Col>
      <Col/>
      </Row>
      
      <div id="settingPageContainer" className="Settings">
        <div className="leftbox">
          {/* <nav>
            <a onClick="tabs(0)" className="tab active">
              <FaIcons.FaUserCog />
            </a>
            <a onClick="tabs(1)" className="tab">
              <FaIcons.FaCreditCard />
            </a>
            <a onClick="tabs(2)" className="tab">
              <FaIcons.FaLaptop />
            </a>
            <a onClick="tabs(3)" className="tab">
              <FaIcons.FaRegListAlt />
            </a>
            <a onClick="tabs(4)" className="tab">
              <i className="fa fa-cog"></i>
            </a>
          </nav> */}
        </div>
        <div className="rightbox">
          <div className="profile tabShow">
            <h1>Personal Information</h1>
            <div></div>
            <h2>Full name</h2>
            <input type="text" className="input" placeholder="Name" />
            <h2>Birthday</h2>
            <input type="text" className="input" placeholder="DOB" />
            <h2>Gender</h2>
            <input type="text" className="input" placeholder="Gender" />
            {/*<h2>Email</h2>
             <input type="text" className="input" placeholder="Email" />
            <h2>Password</h2>
            <input type="password" className="input" placeholder="brightcode" />
            <button className="btn">Update</button> */}
          </div>
          {/* <div className="payment tabShow">
            <h1>Payment Information</h1>
            <h2>Payment Method</h2>
            <input
              type="text"
              className="input"
              placeholder="Master Card - 0202 ******** 7336"
            />
            <h2>Billing Address</h2>
            <input
              type="text"
              className="input"
              placeholder="8, Maynooth, Co.Kildare. Ireland"
            />
            <h2>Zip Code</h2>
            <input type="text" className="input" placeholder="872316" />
            <h2>Billing Date</h2>
            <input type="text" className="input" placeholder="17 March, 2021" />
            <h2>Reedem Card</h2>
            <input type="password" className="input" placeholder="Enter Gift Code" />
            <button className="btn">Update</button>
          </div> */}
          {/* <div className="subscription tabShow">
            <h1>Subscription Information</h1>
            <h2>Payment Date</h2>
            <p>17 March, 2021</p>
            <h2>Next charges</h2>
            <p>
              €80.5 <span>includes taxes</span>
            </p>
            <h2>Plan</h2>
            <p>Limited Plan</p>
            <h2>Monthly</h2>
            <p>€108.5/Month</p>
            <button className="btn">Update</button>
          </div> */}
          {/* <div className="privacy tabShow">
            <h1>Privacy Settings</h1>
            <h2>Manage Email Notifications</h2>
            <h2>Manage Privacy Settings</h2>
            <h2>View Terms of Use</h2>
            <h2>Personalized Ad Experience</h2>
            <h2>Protect Account</h2>
            <button className="btn">Update</button>
          </div> */}
          {/* <div className="settings tabShow">
            <h1>Account Settings</h1>
            <h2>Sync WatchList</h2>
            <h2>Hold Subscription</h2>
            <h2>Cancel Subscription</h2>
            <h2>Your Devices</h2>
            <h2>Referrals</h2>
            <button className="btn">Update</button>
          </div> */}
        </div>
      </div>
      </Container>
    );
  }
}

export default Settings;
