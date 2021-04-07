import React, { Component } from "react";
import "./About.css";
import logo from '../../images/avatarblack100px.png';

class About extends Component {
  render() {
    return (
      <div className="About">
          <div className="body">
            <h3> About </h3>
            <hr/> 
            <h5>Company:</h5>
            <p>Globetrotter Point</p><br/>
            <p>The Globetrotter point is one of a kind platform for travel and photography enthusiasts.
              On our platform you can store pictures and also mark your trips in a unique world map display.
              Connect your social media account and freely share your photos with friends.
            </p>
            <h5>Address:</h5>
            <p>Maynooth University,<br/>
                Maynooth,<br/>
                Co Kildare,<br/>
                Ireland. </p><br/>

            <h5>Contact</h5>
            <p>Phone: +353 1 708 6000 <br/>
                 Fax: +353 1 628 9063<br/>
            Email address:  <a href="mailto:info@globetrotterpoint.com">info@globetrotterpoint.com </a><br/>
            <a href="Will do this later">Contact form</a> <br/></p>

            <h5>Managing Directors:</h5>
            Kevin Casey<br/>
            Sheetal Raju Gotur<br/>
            Muhamed Heljic<br/>
            <hr/>

            <table id="aboutTable">
              <tr >
                <td ><img src={logo} alt="Avatar" /></td>
                <td ><b>Clinton Bates, Co-Founder</b> <br/>
                Clinton is one of the founders of Globetrotter Point. He has always been interested in new technologies, studied computer science in Maynooth (Ireland), and has launched several web projects. Clinton likes sports, especially running, mountain-biking, and hiking. He is always on the lookout for new challenges.
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td><b>Evan Campion, Co-Founder</b><br/>
                Evan is the co-founder of Globetrotter Point. He studied chemistry in Limerick (Ireland) and finished his PhD in 2015. During this time, he started working in the IT sector and developed various websites. Evan enjoys rock climbing, mountain-biking, and other adventures around the globe.
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td><b>Anna Kasprzak, Co-Founder, Image Quality Control</b><br/>
                Anna (Poland) is the latest member in our team. She is working through the daily flood of new images and videos, evaluating quality factors, tags, and legality of all uploads. Anna is a professional photographer and image editor with lots of experiences in the artistic sector. Together with her partner, she currently enjoys the beauty of Ireland, where she has opened her first photography business, The Studio Rhapsody.
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td><b>Cristina Gonzalez Marrero, Co-Founder, Social Media Marketing</b><br/>
                Cristina lives in Tenerife (Canary Islands) and she is our driving force in social networking. She has over 10 years of internet marketing experience. Besides Globetrotter Point, she is currently active as community manager on NGO , an international micro blogging platform.
                </td>
              </tr>
              <tr>
                <td><img src={logo} alt="Avatar" /></td>
                <td><b>Kim Winter, Co-Founder, Marketing and Growth Hacking</b><br/>
                Kim lives in Waterford (Ireland) and she has joined our team recently as an online marketer and growth hacker. Kim studied linguistics and has over five years experience in content management and internet marketing. She enjoys travelling, hiking, and any handicraft work in which she can express her imagination.
                </td>
              </tr>
            </table>

          </div>
      </div>
    );
  }
}
export default About;