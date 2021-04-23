import React, { Component } from "react";
import { Container, Button, Row, Col, Form, ProgressBar } from 'react-bootstrap';
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/storage'; //where we hold the photo
import 'firebase/firestore'; //database to store the photo URLs that we can interat with
import Gallery from "../photoGallery/gallery.js";
import "./uploadPhotos.css";
//need it for file input dialog
import BsCustomFileInput from 'bs-custom-file-input';

//update rules back to 
//allow read, write: if request.auth != null; 
//after correcting logged in user issue

//so we can interact easily with storage / firestore in this component
const storage = firebase.storage();
const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

class UploadPhotos extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          countryList: [],
          image: null,
          url: null,
          progress: 0,
          showProgressBar: false,
          country: null
        };
      this.setURL = this.setURL.bind(this);
      this.addCountry = this.addCountry.bind(this);
    }
    
    setURL(urlpassed){
      this.setState({ url: urlpassed});
    } 
    addCountry = (id) =>{
      let countryName = id;
      console.log(countryName);
      this.setState({country: countryName});
      console.log(this.state.country);
    } 
    
    componentDidMount() {
      //not sure why is this needed but the library instructions ask for it: https://www.npmjs.com/package/bs-custom-file-input#how-to-use-it
      BsCustomFileInput.init()
    }
    render() {
      const authenticated = this.props.authenticated;
      const currentUser = this.props.currentUser;  
      //const country = "ireland"; //update with trip form
      const image = this.state.image;
      //sets the allowed file types that can be uploaded
      const types = ['image/jpeg', 'image/png'];
      
      const changeHandler = (event) => {
        let photo = event.target.files[0];
        //confirms that the correct file types have been uploaded
        if (types.includes(photo.type)){
          this.setState({image: photo});
        }else{
          //if error
          photo =null; //removes file from photo variable if not image
          alert("Please upload an image file (jpeg or png)");
        }  
      };
      const getCountryList =() =>{
        let docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("trips")
        docPath.onSnapshot((snap) =>{
            if (snap.empty){
              alert("No trips added yet. Please add in the trips tab!");
              console.log("Firestore trips collection empty");
            }else{
            let countryListArray = [];
            snap.forEach(doc =>{
                countryListArray.push({...doc.data(), id: doc.id}); //push data and the unique firestore doc id to the array documents
            });
            this.setState({countryList: countryListArray})
        //console.log(this.state.countryList);
    }})}
      
      const handleSubmission = () => {

            if (image != null){ //stops errors if user tries to upload non-image file type
            //show progress bar
            this.setState({showProgressBar: true});
            //images is just creating the name of the folder in firebase storage
            //want to change `images` to the country name that user is uploading to 
              const uploadTask = storage.ref(image.name);
              const imageRef = firestore
                                  .collection("users")
                                  .doc(localStorage.getItem("uid"))
                                  .collection("images");
              uploadTask.put(image) //uploads image to firebase storage
              .on(
              "state_changed",
              snapshot => {//current progress of upload
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({progress: percentage}); //update state progress
              }, 
              error => { //if error
                console.log(error);
                //hide progress bar after 2 sec
                setTimeout( () => this.setState({ showProgressBar: false }), 3000 );
              },
              async ()=>{ 
                //if successfully uploaded, get URL
                const url = await uploadTask.getDownloadURL()
                this.setURL(url); //update state url
                console.log(this.state.url);
                const createdAt = timestamp();
                console.log(imageRef)
                imageRef.add({ //adding the image url to the users firestore
                  imageURL: url, 
                  date: createdAt, 
                  country: this.state.country,
                  name: image.name }); //should be adding to the 
                //hide progress bar after 2 sec
                setTimeout( () => this.setState({ showProgressBar: false }), 3000 );
                this.setState({country: null});
              }
            )
            }
            
          };
        return (
          <Container fluid className="photo-container">
            <Row>
              {/* shows photo upload progress to user */}
              <ProgressBar animated now={this.state.progress} label={this.state.progress+'%'}
              className={this.state.showProgressBar == true ? "d-inline-flex" : "d-none"}
              variant="dark"/>
            </Row>
            <Row>
                <Col>
                  <Gallery authenticated = {authenticated} currentUser ={currentUser}/>
                </Col>
                <Col xs={2} className="pr-4">
                <div className="country-dropdown">
                <button className="country-dropdown-btn" variant="info" size="sm" onClick={getCountryList}>Choose country</button>
                  <div className="country-dropdown-content">
                        {this.state.countryList.map((c) => ( 
                            <a key={c.id} onClick={() =>this.addCountry(c.id)}>{c.id} </a>
                        ))}  
                    </div>
                 </div>
                 {this.state.country !== null && <div>Uploading to {this.state.country} album</div>}
                  <Row>
                    {/* inspired from: https://react-bootstrap.netlify.app/components/forms/#forms-custom-file*/}
                    <Form className="pb-2">
                      
                      <Form.File className="text-left"
                        id="custom-file"
                        label="Choose file"
                        custom
                        multiple onChange={changeHandler}
                      />
                    </Form>
                  </Row>
                  <Row>
                    <Button className="float-right" variant="outline-info" size="sm" id="uploadphoto-button" onClick={handleSubmission}>Upload</Button>
                  </Row>
                </Col>

            </Row>


 


          </Container>

        );
      }
}
export default UploadPhotos;