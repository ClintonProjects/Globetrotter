import React, { Component } from "react";
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/storage';

//update rules back to 
//allow read, write: if request.auth != null; 
//after correcting logged in user issue
const storage = firebase.storage();

class UploadPhotos extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          image: null
          
        };
    }

    render() {
      const authenticated = this.props.authenticated;
      const currentUser = this.props.currentUser;  
      
      const changeHandler = (event) => {
            this.setState({image: event.target.files[0]});
          };
        
      const handleSubmission = () => {
            //alert("You have selected "+this.state.image.length+" files!");
            console.log(this.state.image);//checking if image is held in state
            console.log(currentUser.uid);//confirming what user is currently logged in
            //images is just creating the name of the folder in firebase storage
            //want to change `images` to the country name that user is uploading to 
            const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image)
            uploadTask.on(
              "state_changed",
              snapshot => {
                
              }, //current progress
              error => { //if error
                console.log(error);
              },
              ()=>{ //if okay to upload
                storage
                .ref("images")
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url => {
                  console.log(url);
                })
              }
            )
          };
        return (
        <div>
          
            <input type="file" name="file" multiple onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Upload</button>
            </div>
        </div>
        );
      }
}
export default UploadPhotos;