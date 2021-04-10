import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/storage'; //where we hold the photo
import 'firebase/firestore'; //database to store the photo URLs that we can interat with
import Gallery from "../photoGallery/gallery.js";
import "./uploadPhotos.css";

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
          image: null,
          url: null,
          progress: 0
        };
      this.setURL = this.setURL.bind(this);
    }
    setURL(urlpassed){
      this.setState({ url: urlpassed});
    }    
    render() {
      const authenticated = this.props.authenticated;
      const currentUser = this.props.currentUser;  
      const country = "Ireland"; //update with trip form
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
      
      const handleSubmission = () => {

            if (image != null){ //stops errors if user tries to upload non-image file type
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
              },
              async ()=>{ //if successfully uploaded, get URL
                const url = await uploadTask.getDownloadURL()
                this.setURL(url); //update state url
                console.log(this.state.url);
                const createdAt = timestamp();
                console.log(imageRef)
                imageRef.add({ //adding the image url to the users firestore
                  imageURL: url, 
                  date: createdAt, 
                  country: country,
                  name: image.name }); //should be adding to the 
              }
            )
            }
            
          };
        return (
          <Container className="photo-container">
              {/* shows photo upload progress to user */}
              <div className="progress-bar" style={{width: this.state.progress + '%'}}/>
              
              <input 
                id="choosefilebutton" 
                type="file" 
                name="file" 
                multiple onChange={changeHandler} />
              {/* {image && <div>{image.name}</div>} */}
                
              <button 
                id="uploadphoto-button"
                onClick={handleSubmission}>
                Upload
              </button>
 
                 <Gallery 
                  authenticated = {authenticated}
                  currentUser ={currentUser}
                  />  

          </Container>

        );
      }
}
export default UploadPhotos;