import React, {Component}  from "react";
import { Container, Carousel, Button, Row, Col, Image } from 'react-bootstrap';
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/firestore';
import "./Gallery.css"; //database to store the photo URLs that we can interat with

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
    const currentGallery = firestore
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

    //Bootstrap carousel inspired from https://react-bootstrap.github.io/components/carousel/   
    //method that will build carousel items (one item for each picture in doc array)
    const cItems = (docs && docs.map(doc =>{
        return <Carousel.Item key={doc.id}>
            <img
            className="d-block w-100"
            src={doc.imageURL}
            alt="users-travel-pic"
            />
            <Carousel.Caption> <h3>{doc.name}</h3> </Carousel.Caption>
        </Carousel.Item>
    }));
    //method that will build thumnails pictures
    const tItems = (docs && docs.map(doc =>{
        return <Col xs={6} md={2} className="col-2" key={doc.id}>
            <Image src={doc.imageURL} alt="users-travel-pic" rounded className="img-thumbnail"/>
        </Col>
    }));
    return(
        <Container className="Gallery">
            <Row className="pb-2">
                <Button variant="info" size="lg" onClick={showPhotos}> 
                Load Photos </Button>
            </Row>
            <Row className="pb-2">
                <Carousel> {cItems} </Carousel>
            </Row>
            <Row className="no-gutters">
                {tItems} 
            </Row>
        </Container>
    )
    }
}
export default Gallery;