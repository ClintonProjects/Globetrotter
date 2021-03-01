import React, { Component } from "react";
import "./Help.css";

class Help extends Component {

  constructor(props) {
    super(props);
    //binding the event handler methods
    this.handleClick = this.handleClick.bind(this);
  //  this.handleChangeSubject = this.handleChangeSubject.bind(this);
  //  this.handleChangeDescription = this.handleChangeDescription.bind(this);
  //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    let x = event.target.children[1];
    if (x.style.display === "none" || x.style.display === "") {
      x.style.display = "inline-block";
    } else {
      x.style.display = "none";
    }
  }

  render() {
    return (
        
      <div className="content1">
            <h3>Help</h3>

            <div className="faq-link"  onClick={this.handleClick}> 
            What is Globetrotterpoint
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            <div className="faq-link" onClick={this.handleClick}> 
            How do I delete my account?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            <div className="faq-link" onClick={this.handleClick}> 
            How can I edit my profile?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            <div className="faq-link" onClick={this.handleClick}> 
            How can I sdd my Instagram, Twitter and website to my profile?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            <div className="faq-link" onClick={this.handleClick}> 
            How do I change language settings?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            <div className="faq-link" onClick={this.handleClick}> 
            How do I create collections/albums on Globetrotter Point?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            <div className="faq-link" onClick={this.handleClick}> 
            Can I make private collections/albums?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>

            
            <div className="faq-link" onClick={this.handleClick}> 
            Can I use your images?
            <br/>
              <div className="faq-content">
                TODO: add description from one of the slides
              </div>
            </div>




      </div>
    );
  }
}
export default Help;