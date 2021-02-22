import React, { Component } from "react";
import './Footer.css';



export class Footer extends Component {
  render() {
    return (
      <footer>
        <div class="row bg-secondary ">
          <div class="col-sm-12 text-light bt text-center ">

          </div>
          <div class="col-1 bg-dark"></div>
          <div class="col-sm-3 text-light small bg-dark">
            <p>Home |  Contact Us | Terms Of Service</p>
          </div>
          <div class="col-sm-3 text-light small bg-dark text-center">
            </div>
            <div class="col-sm-4 text-light small bg-dark text-right">
             <p>Copyright @ Globetrotter 2021-2021. All rights reserved.</p>
            </div>
            <div class="col-sm-1  bg-dark"></div>
        </div>

      </footer>
    );
  }
}

export default Footer;