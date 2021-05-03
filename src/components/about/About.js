import React, { Component } from "react";
import "./About.css";
import { Container, Table, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import logo from '../../images/avatar S.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

class About extends Component {
  render() {
    return (
      <Container flex="true" className="About pt-3">
        <Container className="AboutContent whiteBackground">
        <Row>
          <Col xs={1}/>
          <Col>
          <Row><p className="h3 pt-3"> About </p>
          <hr className="textColour"/></Row>
          
          <Row><p className="h5"> Company: </p></Row>
          <Row><p> The Globetrotter point is one of a kind platform for travel and photography enthusiasts.
              On our platform you can store pictures and also mark your trips in a unique world map display.
              Connect your social media account and freely share your photos with friends. </p></Row>
          <Row>
            <Col>
            <p className="h5"> Contact </p>
            <p>Phone: +353 1 708 6000 <br/>
                 Fax: +353 1 628 9063<br/>
            Email address: info@globetrotterpoint.com<br/></p>
            <Link className="nounderline" to="/contactus" onClick={this.props.picBack}>
           <Button className="buttonStyle" variant="primary" type="submit" block>CONTACT US</Button>
           </Link>
            </Col>
            <Col>
            <h5>Address:</h5>
            <p>Maynooth University,<br/>
                Maynooth,<br/>
                Co Kildare,<br/>
                Ireland. </p><br/>
            </Col>
            <Col>
            <h5>Managing Directors:</h5>
            Kevin Casey<br/>
            Sheetal Raju Gotur<br/>
            Muhamed Heljic<br/>
            </Col>
          </Row>
          <hr className="textColour"/>
          <Row>
          <Table borderless size="sm">
            <tbody>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td>
                  <p className="h6">Clinton Bates, Co-Founder</p>
                  <p>Clinton is one of the founders of Globetrotter Point. He has always been interested in new technologies, studied computer science in Maynooth (Ireland), and has launched several web projects. Clinton likes sports, especially running, mountain-biking, and hiking. He is always on the lookout for new challenges.</p>
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td>
                  <p className="h6">Evan Campion, Co-Founder</p>
                  <p>Evan is one of the co-founder of Globetrotter Point. He studied a BBS.Accounting and Finance in Limerick (Ireland) and he has a strong experience working as an Senior Analyst. Besides Globetrotter Point, he loves sports but particularly surfing and he is the Secretary of Maynooth Language Society. Evan is an outgoing person who loves learning new languages and last but not least, he has a good level of Spanish.  </p>
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td>
                  <p className="h6">Anna Kasprzak, Co-Founder, Image Quality Control</p>
                  <p>Anna (Poland) is the latest member in our team. She is working through the daily flood of new images and videos, evaluating quality factors, tags, and legality of all uploads. Anna is a professional photographer and image editor with lots of experiences in the artistic sector. Together with her partner, she currently enjoys the beauty of Ireland, where she has opened her first photography business, The Studio Rhapsody.</p>
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td>
                  <p className="h6">Cristina González Marrero, Co-Founder</p>
                  <p>Cristina is from Tenerife (Canary Islands). She has a BSc.Mathematics in ULL (Tenerife) and was a Maths Teacher for many years. However, she has discovered her passion in Software Development and in doing so undertook a Fullstack Bootcamp in 2018 to develop her skills. Besides Globertrotter Point, she is one of the competitors in Maynooth Dance Society representing NUIM in Ireland and is an avid surfer. </p>
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td>
                  <p className="h6">Kim Winters, Co-Founder, Marketing and Growth Hacking</p>
                  <p>Kim lives in Waterford (Ireland) and she has joined our team recently as an online marketer and growth hacker. Kim studied linguistics and has over five years experience in content management and internet marketing. She enjoys travelling, hiking, and any handicraft work in which she can express her imagination.</p>
                </td>
              </tr>
            </tbody>
          </Table>
          </Row>
          </Col>
          <Col xs={1}/>
        </Row>
        </Container>
      </Container>
    );
  }
}
export default About;