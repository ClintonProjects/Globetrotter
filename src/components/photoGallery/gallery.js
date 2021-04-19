import React, {Component}  from "react";
import { Container, Carousel, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/firestore';
import "./Gallery.css"; 

//so we can interact easily with firestore in this component
const firestore = firebase.firestore();

//carousel interval values for slides on and off
const carouselOn = 4000;
const carouselOff = 99999999999; //not sure hot to turn off so just giving a large number seem to work

class Gallery extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
        
          countryList: [],
          countryView: null,
          docs: [],
          picComment: '',
          selectedThumbnail: -1, //use this state to keep track which thumbail is selected
          carouselIndex: 0, //store the active carousel index in the state so that it can be programaticaly changed
          carouselInterval: carouselOn, //slide interval
          showPicMenuTooltip: false, //determine if pic tooltip menu should be displayed
          picMenuTimeoutID: [], //store the menu hide timeout id so that it can ce cancelled when needed
          carouselStartTimeoutID: [] //store the carousel restart timeout id so that it can ce cancelled when needed
          
        };
        this.deletePicHandler = this.deletePicHandler.bind(this);
        this.commentPicHandler = this.commentPicHandler.bind(this);
        this.sharePicHandler = this.sharePicHandler.bind(this);
        this.setCountry = this.setCountry.bind(this);
        
    }
    setCountry(countryPassed){
        this.setState({ countryView :  countryPassed});
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
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore update method to add a field to that document(image) in firestore with the users comments
        var docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.update({comments: this.state.picComment})
        //advise if successfully added comment field or not
        .then (() => {
            alert("Successfully saved your comments for this picture: "+this.state.picComment);
        }).catch((error) => {
            alert("Error saving comments"+ error);
        })
    }
    addToFavouritesHandler = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore update method to add a field to that document(image) in firestore with the users comments
        var docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.update({favourites: true})
        //advise if successfully added comment field or not
        .then (() => {
            alert("Successfully saved your photo to Favourites");
        }).catch((error) => {
            alert("Error saving photo"+ error);
        })
    }

    sharePicHandler = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore delete method (call on full path collection-> document to be deleted)
        var docPath =firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.get()
        .then((doc) => {
            var url = doc.data().imageURL;
            alert("Share your image using: "+url);
        }).catch((error) => {
            alert("Error getting image URL "+error);
        });
    }

    deletePicHandler = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore delete method (call on full path collection-> document to be deleted)
        var docPath =firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.delete()
        //advise if successful or unsuccessful delete
        .then(() =>{
            alert("Successfully deleted image");
        }).catch((error) => {
            alert("Error deleting photo "+ error);
        }); 
    }
    downloadPicture =() =>{
       //get the firestore document ID for the selected image
       var getDocID = this.state.docs[this.state.carouselIndex].id;
       //use firestore delete method (call on full path collection-> document to be deleted)
       var docPath =firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
    //    docPath.download() ** anna to download
    //    //advise if successful or unsuccessful delete
    //    .then(() =>{
    //     alert("Successfully downloaded image");
    //     }).catch((error) => {
    //     alert("Error downloading photo "+ error);
    // }); 
    }

    render(){
    const docs = this.state.docs;
    var currentGallery = firestore
                        .collection("users")
                        .doc(localStorage.getItem("uid"))
                        .collection("images")
    
    const showPhotos = () =>{
        this.setState({docs: null});
        currentGallery
        //.orderBy('createdAt', 'desc') *Anna can decide order that photos or albums are displayed
        .onSnapshot((snap) =>{
            if (snap.empty){
                console.log("error");
            }else{
            let documents = [];
            snap.forEach(doc =>{
                documents.push({...doc.data(), id: doc.id}); //push data and the unique firestore doc id to the array documents
            });
            this.setState({docs: documents}); //update state with the documents array
            console.log(docs); //check 
            
        }})
    }
    const showFavourites = () =>{
        this.setState({docs: null});
        currentGallery
        //.orderBy('createdAt', 'desc') *Anna can decide order that photos or albums are displayed
        .onSnapshot((snap) =>{
            if (snap.empty){
                console.log("error");
            }else{
            let documents = [];
            snap.forEach(doc =>{
                if (doc.data().favourites)
                documents.push({...doc.data(), id: doc.id}); //push data and the unique firestore doc id to the array documents
            });
            this.setState({docs: documents}); //update state with the documents array
            console.log(docs); //check 
            
        }})
    }
    const showCountry = (id) =>{
        let countryName = id.toLowerCase();
        console.log(countryName);
        this.setState({docs: null});
        currentGallery
        //.orderBy('createdAt', 'desc') *Anna can decide order that photos or albums are displayed
        .onSnapshot((snap) =>{
            if (snap.empty){
                console.log("error");
            }else{
            let documents = [];
            snap.forEach(doc =>{
                if (doc.data().country.toLowerCase() === countryName)
                documents.push({...doc.data(), id: doc.id}); //push data and the unique firestore doc id to the array documents
            });
            this.setState({docs: documents}); //update state with the documents array
            console.log(docs); //check 
            
        }})
    }
    const getCountryList =() =>{
        let docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("trips")
        docPath.onSnapshot((snap) =>{
            if (snap.empty){
                console.log("error");
            }else{
            let countryListArray = [];
            snap.forEach(doc =>{
                countryListArray.push({...doc.data(), id: doc.id}); //push data and the unique firestore doc id to the array documents
            });
            this.setState({countryList: countryListArray})
        //console.log(this.state.countryList);
    }})}
      
    //method that will build carousel items (one item for each picture in doc array)
    const cItems = (docs && docs.map(doc =>{
        return <Carousel.Item key={doc.id}>
            {/*Bootstrap carousel inspired from https://react-bootstrap.github.io/components/carousel/ */}
            <img
            className="d-block w-100"
            src={doc.imageURL}
            alt="users-travel-pic"
            />
            <Carousel.Caption> <h3>{doc.comments}</h3> </Carousel.Caption>
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
                <Button variant="outline-info" onClick={this.addToFavouritesHandler}>Add to Favourites</Button>
            </Row>
            <Row className="pb-3">
                <Button variant="outline-dark" onClick={this.downloadPicture}> Download photo</Button>
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
                <Button variant="info" size="sm" onClick={showPhotos} > Photos </Button>
                <Button variant="info" size="sm" onClick={showFavourites} > Favourites </Button>
                <div className="country-dropdown">
                    <Button className="country-dropdown-btn" variant="info" size="sm" onClick={getCountryList}> 
                        Country </Button>
                    <div className="country-dropdown-content">
                        {this.state.countryList.map((c) => ( 
                            <a key={c.id} onClick={() =>showCountry(c.id)}>{c.id} </a>
                        ))}  
                    </div>
                </div>
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
                    {cItems}  
                    
                    </Carousel>
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