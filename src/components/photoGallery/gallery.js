import React, {Component}  from "react";
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/firestore'; //database to store the photo URLs that we can interat with

//so we can interact easily with firestore in this component
const firestore = firebase.firestore();

class Gallery extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          docs: []
        };
    }

    render(){
    const docs = this.state.docs;
    var currentGallery = firestore
                        .collection("users")
                        .doc(`${this.props.currentUser.uid}`)
                        .collection("images")                 
                        
    const showPhotos = () =>{
        console.log(this.props.currentUser.uid);
        currentGallery
        //.orderBy('createdAt', 'desc')
        .onSnapshot((snap) =>{
            if (snap.empty){
                console.log("no uid - gallery file");
            }else{
            let documents = [];
            snap.forEach(doc =>{
                documents.push({...doc.data(), id: doc.id});
            });
            this.setState({docs: documents});
            console.log(docs);
        }})
    }
        return(
            
            <div className="image-grid">
                
                <h2 onClick={showPhotos}>See Photos</h2>
                
                {docs && docs.map(doc =>(
                    <div className="img-wrap" key ={doc.id}>
                        {console.log(doc.id)} 
                        <img src={doc.imageURL} alt="users-travel-pic"/>
                    </div>
                ))}
            </div>
            
        )
    }
}
export default Gallery;