import React, {Component}  from "react";
import { Container, Carousel, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/firestore';
import "./Gallery.css"; //database to store the photo URLs that we can interat with

//so we can interact easily with firestore in this component
const firestore = firebase.firestore();

//carousel interval values for slides on and off
const carouselOn = 4000;
const carouselOff = 99999999999; //not sure hot to turn off so just giving a large number seem to work

class Gallery extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          docs: [],
          picComment: '',
          selectedThumbnail: -1, //use this state to keep track which thumbail is selected
          carouselIndex: 0, //store the active carousel index in the state so that it can be programaticaly changed
          carouselInterval: carouselOn, //slide interval
          showPicMenuTooltip: false, //determine if pic tooltip menu should be displayed
          picMenuTimeoutID: [], //store the menu hide timeout id so that it can ce cancelled when needed
          carouselStartTimeoutID: [] //store the carousel restart timeout id so that it can ce cancelled when needed


        };
    }
    
    //method to handle thumbnail clicks
    thumbnailClick = (event) => {
        let docID = event.currentTarget.getAttribute('doc_id');
        //set selected thumbnail pic id to state
        this.setState({selectedThumbnail: docID});
        //use the thumbnail id to select the big picture on the carousel
        if(this.state.docs.length >0){
            //find the index of clicked thumbnail
            let idx = this.state.docs.findIndex(doc => doc.id == docID)
            //set the carousel active index to the one of selected thumbnail 
            this.setState({carouselIndex: idx});
        }
        
    }

    //method the carousel will use on each transition
    carouselSelect = (selectedIndex) => {
        //set the carousel active index
        this.setState({carouselIndex: selectedIndex});
        //check if any pictures have been loaded from firestore
        if(this.state.docs.length >0){
            //get the doc at selected index by carousel animation 
            let carouselDocId = this.state.docs[selectedIndex].id;
            //set the selected thumbnail id to the newly retrieved doc
            this.setState({selectedThumbnail: carouselDocId});
        }

    }

    //method to disable carousel sliding and show pic menu tooltip
    stopSliding = () => {
        //stop sliding
        this.setState({ carouselInterval: carouselOff }); 
        this.setState({ showPicMenuTooltip: true });
        //prevent all the delayed sliding restarts IDs
        this.state.carouselStartTimeoutID.forEach(timeout => clearTimeout(timeout));
        this.setState({ carouselStartTimeoutID: [] });
        this.state.picMenuTimeoutID.forEach(timeout => clearTimeout(timeout));
        this.setState({ picMenuTimeoutID: [] });

    }

    //method to enable carousel sliding and hide pic menu tooltip
    startSliding = () => {
        //start sliding
        //console.log("start sliding ");
        this.setState({ carouselInterval: carouselOn }); 
        this.setState({ showPicMenuTooltip: false });
    }

    commentPicHandler = () => {
        alert("Comment pressed for picture at index "+this.state.carouselIndex +" with value "+this.state.picComment);
    }

    sharePicHandler = () => {
        alert("Share pressed for picture at index "+this.state.carouselIndex);
    }

    deletePicHandler = () => {
        alert("Delete pressed for picture at index "+this.state.carouselIndex);
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

      
    //method that will build carousel items (one item for each picture in doc array)
    const cItems = (docs && docs.map(doc =>{
        return <Carousel.Item key={doc.id}>
            {/*Bootstrap carousel inspired from https://react-bootstrap.github.io/components/carousel/ */}
            <img
            className="d-block w-100"
            src={doc.imageURL}
            alt="users-travel-pic"
            />
            <Carousel.Caption> <h3>{doc.name}</h3> </Carousel.Caption>
        </Carousel.Item>
      

    }));

    //Picture menu react element
    const picMenu = <Popover id={'popover-positioned-right-start'}>
        <Popover.Title as="h1" className="text-center">Picture Menu</Popover.Title>
        <Popover.Content
            onFocus={() => this.stopSliding()}
            onMouseMove={() => this.stopSliding()}
            //start sliding with timemout method to to give mouse a chance to enter carousel
            onMouseLeave={() => this.setState( 
                {picMenuTimeoutID: [...this.state.picMenuTimeoutID, setTimeout( () => this.startSliding(), 3000 )]})}
            >
        <Container>
            <Row className="pb-4">
                <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Picture Comment"
                        aria-label="Picture Comment"
                        onChange={event => { 
                            this.setState({ picComment : event.target.value });
                        }} 
                        />
                        <InputGroup.Append>
                        <Button variant="outline-info" onClick={this.commentPicHandler}>Add Comment</Button>
                        </InputGroup.Append>
                </InputGroup>
            </Row>
            <Row className="pb-3">
                <Button variant="outline-info" onClick={this.sharePicHandler}>Share</Button>
            </Row>
            <Row className="pb-3">
                <Button variant="outline-dark" onClick={this.deletePicHandler}>Delete</Button>
            </Row>
        </Container>
        </Popover.Content>                        
    </Popover>
    //method that will build thumnails pictures
    const tItems = (docs && docs.map(doc =>{
        return <Col xs={6} md={2} className="col-2" key={doc.id}>
            <Image src={doc.imageURL} alt="users-travel-pic" rounded
            doc_id={doc.id} 
            onClick={this.thumbnailClick}
            className={this.state.selectedThumbnail == doc.id ? "img-thumbnail galery-thumbnail" : "img-thumbnail"}/>
        </Col>
    }));
    return(
        <Container className="Gallery">
            <Row className="pb-2">
                <Button variant="info" size="lg" onClick={showPhotos}> 
                Load Photos </Button>
            </Row>
            <Row className="pb-2">
            
                <OverlayTrigger
                    //Bootstrap overlay popover inspired from https://react-bootstrap.netlify.app/components/overlays/
                    trigger={['hover', 'focus']}
                    key="right"
                    placement="right-start"
                    show={this.state.showPicMenuTooltip}
                    delay={{ show: 0, hide: 10 }}
                    overlay={picMenu}
                >
                    <Carousel pause="hover" interval={this.state.carouselInterval} activeIndex={this.state.carouselIndex} onSelect={this.carouselSelect}
                    onFocus={() => { this.stopSliding(); }}
                    onMouseMove={() => { this.stopSliding(); }}
                    onMouseLeave={() => 
                    //start sliding with timemout method to to give mouse a chance to enter pic menu
                    this.setState( {
                        carouselStartTimeoutID: [...this.state.carouselStartTimeoutID, setTimeout( () => this.startSliding(), 3000 )]})
                    }> 
                    {cItems} </Carousel>
                </OverlayTrigger>
            
                
            </Row>
            <Row className="no-gutters">
                {tItems}                 
            </Row>
        </Container>
    )
    }
}
export default Gallery;