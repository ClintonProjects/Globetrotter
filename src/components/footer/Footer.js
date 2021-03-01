import React, { Component } from "react";
import './Footer.css';
import { FaGithub, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

// npm install react-icons --save

export class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <footer>
        <div class="row text-center" >
          <div class="row bg-dark footer-margin-bottom">
            <div class="col-sm-1"></div>
            {/* <p class="col-sm-2 text-light footer-margin-top">Logo goes here</p> */}
            <p class="col-sm-2 text-light footer-margin-top"></p>
            <div class="col-sm-2"></div>
            <div class="col-sm-2 text-light text-left footer-margin-top-icons">

              <a href="https://www.linkedin.com/">
                <FaLinkedin size="2em" className="icon" />
              </a>

              <a href="https://www.youtube.com/">
                <FaYoutube size="2em" className="icon" />
              </a>

              <a href="https://www.Instagram.com/">
                <FaInstagram size="2em" className="icon" />
              </a>

              <a href="https://www.Facebook.com/">
                <FaFacebook size="2em" className="icon" />
              </a>
              <a href="https://www.Github.com/">
                <FaGithub size="2em" className="icon" />
              </a>

              <a href="https://www.Twitter.com/">
                <FaTwitter size="2em" className="icon" />
              </a>

            </div>         
             <p class="col-sm-2 text-light footer-margin-top"></p>
            <small class="col-sm-2 text-left text-light"></small>
          </div>

          <div class="row bg-dark footer-borader" >
          <small class="col-sm-2 text-left text-light"></small>
            <small class="col-sm-8 text-center text-light">
              Copyright @ Globetrotter 2021-2021. All Rights Reserved.</small>
              {/* <small class="col-sm-1 text-left text-light  footer-margin-bottom">support@Globetrotter.com</small> */}
             <small class="col-sm-1 text-left text-light"></small>
          </div>


        </div>

      </footer>


    );
  }
}

export default Footer;