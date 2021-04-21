import React, { Component } from "react";
import './Footer.css';
import { FaGithub, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Container, Row, Col } from 'react-bootstrap';

// npm install react-icons --save

export class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const currentUser = this.props.currentUser;

    return (

        <Container fluid className="footer">
          <Row className="justify-content-md-center">
            <Col/>
            <Col  xs={6}>
              <a className="a" href="https://www.linkedin.com/">
                <FaLinkedin size="2em" className="icon" />
              </a>

              <a className="a" href="https://www.youtube.com/">
                <FaYoutube size="2em" className="icon" />
              </a>

              <a className="a" href="https://www.Instagram.com/">
                <FaInstagram size="2em" className="icon" />
              </a>

              <a className="a" href="https://www.Facebook.com/">
                <FaFacebook size="2em" className="icon" />
              </a>
              <a className="a" href="https://github.com/ClintonProjects/Globetrotter/blob/master/README.md">
                <FaGithub size="2em" className="icon" />
              </a>

              <a className="a" href="https://www.Twitter.com/">
                <FaTwitter size="2em" className="icon" />
              </a>
            </Col>
            <Col/>
          </Row>
          <Row className="footer-borader justify-content-md-center">
            <Col/>
            <Col  xs={6}>
              <p className="text-light footerText font-weight-light">
                Copyright @ Globetrotter 2021-2021. All Rights Reserved.
              </p>
            </Col>
            <Col xs={3}>
            {currentUser !== null && (
            <p className="text-light footerText font-weight-light text-right">
              Logged on as {this.props.currentUser.email}
            </p>
          )}
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Footer;
