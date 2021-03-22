import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import "./Settings.css";

class Settings extends Component {
  render() {
    return (
      <div id="settingPageContainer" className="Settings">
        <div className="leftbox">
          <nav>
            <a onclick="tabs(0)" className="tab active">
              <FaIcons.FaUserCog />
            </a>
            <a onclick="tabs(1)" className="tab">
              <FaIcons.FaCreditCard />
            </a>
            <a onclick="tabs(2)" className="tab">
              <FaIcons.FaLaptop />
            </a>
            <a onclick="tabs(3)" className="tab">
              <FaIcons.FaRegListAlt />
            </a>
            <a onclick="tabs(4)" className="tab">
              <i className="fa fa-cog"></i>
            </a>
          </nav>
        </div>
        <div className="rightbox">
          <div className="profile tabShow">
            <h1>Personal Information</h1>
            <h2>Full name</h2>
            <input type="text" className="input" value="Cristina Glez" />
            <h2>Birthday</h2>
            <input type="text" className="input" value="April 7, 1994" />
            <h2>Gender</h2>
            <input type="text" className="input" value="Female" />
            <h2>Email</h2>
            <input type="text" className="input" value="hola@gmail.com" />
            <h2>Password</h2>
            <input type="password" className="input" value="brightcode" />
            <button className="btn">Update</button>
          </div>
          <div className="payment tabShow">
            <h1>Payment Information</h1>
            <h2>Payment Method</h2>
            <input
              type="text"
              className="input"
              value="Master Card - 0202 ******** 7336"
            />
            <h2>Billing Address</h2>
            <input
              type="text"
              className="input"
              value="8, Maynooth, Co.Kildare. Ireland"
            />
            <h2>Zip Code</h2>
            <input type="text" className="input" value="872316" />
            <h2>Billing Date</h2>
            <input type="text" className="input" value="17 March, 2021" />
            <h2>Reedem Card</h2>
            <input type="password" className="input" value="Enter Gift Code" />
            <button className="btn">Update</button>
          </div>
          <div className="subscription tabShow">
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
          </div>
          <div className="privacy tabShow">
            <h1>Privacy Settings</h1>
            <h2>Manage Email Notifications</h2>
            <h2>Manage Privacy Settings</h2>
            <h2>View Terms of Use</h2>
            <h2>Personalized Ad Experience</h2>
            <h2>Protect Account</h2>
            <button className="btn">Update</button>
          </div>
          <div className="settings tabShow">
            <h1>Account Settings</h1>
            <h2>Sync WatchList</h2>
            <h2>Hold Subscription</h2>
            <h2>Cancel Subscription</h2>
            <h2>Your Devices</h2>
            <h2>Referrals</h2>
            <button className="btn">Update</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
