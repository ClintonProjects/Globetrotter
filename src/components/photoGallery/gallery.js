import React, { Component } from "react";
import { Container, Carousel, Button, Row, Col, Image, OverlayTrigger, Popover, InputGroup, FormControl, ProgressBar, Form, Accordion, Card, Dropdown } from 'react-bootstrap';
import firebase from "../myFirebaseConfig.js";
import Firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';
import "./Gallery.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//need it for file input dialog
import BsCustomFileInput from 'bs-custom-file-input';

//so we can interact easily with firestore in this component
const firestore = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

//carousel interval values for slides on and off
const carouselOn = 4000;
const carouselOff = 99999999999; //not sure hot to turn off so just giving a large number seem to work

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            url: null,
            progress: 0,
            showProgressBar: false,
            country: "not specified",
            notList: [],
            countryList: [],
            countryView: null,
            docs: [],
            picComment: '',
            settingCountry: '',
            selectedThumbnail: -1, //use this state to keep track which thumbail is selected
            carouselIndex: 0, //store the active carousel index in the state so that it can be programaticaly changed
            carouselInterval: carouselOn, //slide interval
            showPicMenuTooltip: false, //determine if pic tooltip menu should be displayed
            picMenuTimeoutID: [], //store the menu hide timeout id so that it can ce cancelled when needed
            carouselStartTimeoutID: [], //store the carousel restart timeout id so that it can ce cancelled when needed
            imageLink: "",
            imageAvaiable: false, //This for the image upload page.
        };

        this.deletePicHandler = this.deletePicHandler.bind(this);
        this.commentPicHandler = this.commentPicHandler.bind(this);
        this.sharePicHandler = this.sharePicHandler.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setURL = this.setURL.bind(this);
        this.addCountry = this.addCountry.bind(this);
        this.setUserNotifications = this.setUserNotifications.bind(this);
    }

    setUserNotifications = (not) => {
        const firestore = firebase.firestore().collection('users').doc(localStorage.getItem("uid"));
        let jsonSplit;
        var list = [];
        firestore.onSnapshot((data) => {
            let json = JSON.stringify(data.data());
            jsonSplit = JSON.parse(json);
            if (!jsonSplit.notifications.includes(not) && !this.state.notList.includes(not)) {
                this.setState({ notList: jsonSplit.notifications });
                list = this.state.notList;
                list.push(not);
                console.log("notfication added to db: " + not);
                this.setState({ notList: list });
                firebase.firestore().collection('users').doc(localStorage.getItem("uid")).set({ notifications: list });
            }
        });
        return;
    }
    //set url for the image so we can save in firestore
    setURL(urlpassed) {
        this.setState({ url: urlpassed });
    }
    //adding the country to state so we can upload with the image
    addCountry = (event) => {
        let countryName = event.target.value;
        console.log(countryName);
        this.setState({ country: countryName });
        console.log(this.state.country);
    }

    componentDidMount() {
        //not sure why is this needed but the library instructions ask for it: https://www.npmjs.com/package/bs-custom-file-input#how-to-use-it
        BsCustomFileInput.init()
        this.getCountryList();
    }
    //allows a user to set the country on an image if not done with upload
    setCountry(countryPassed) {
        this.setState({ countryView: countryPassed });
    }

    //method to handle thumbnail clicks
    thumbnailClick = (event) => {
        let docID = event.currentTarget.getAttribute('doc_id');
        //set selected thumbnail pic id to state
        this.setState({ selectedThumbnail: docID });
        //use the thumbnail id to select the big picture on the carousel
        if (this.state.docs.length > 0) {
            //find the index of clicked thumbnail
            let idx = this.state.docs.findIndex(doc => doc.id == docID)
            //set the carousel active index to the one of selected thumbnail 
            this.setState({ carouselIndex: idx });
        }
    }

    //method the carousel will use on each transition
    carouselSelect = (selectedIndex) => {
        //set the carousel active index
        this.setState({ carouselIndex: selectedIndex });
        //check if any pictures have been loaded from firestore
        if (this.state.docs.length > 0) {
            //get the doc at selected index by carousel animation 
            let carouselDocId = this.state.docs[selectedIndex].id;
            //set the selected thumbnail id to the newly retrieved doc
            this.setState({ selectedThumbnail: carouselDocId });
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
        docPath.update({ comments: this.state.picComment })
            //advise if successfully added comment field or not
            .then(() => {
                toast.info('😾 Successfully saved your comments for this picture: ' + this.state.picComment, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            }).catch((error) => {
                {
                    toast.info('😾 Error saving comments: ' + error, {
                        position: "bottom-center",
                        autoClose: 2500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
    }
    addToFavouritesHandler = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore update method to add a field to that document(image) in firestore with the users comments
        var docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.update({ favourites: true })
            //advise if successfully added comment field or not
            .then(() => {
                this.setUserNotifications("Congratulations you have added an image to your favourites!");
                toast.info('😾 Successfully saved your photo to Favourites', {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            }).catch((error) => {
                toast.info('😾 Error saving photo: ' + error, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    sharePicHandler = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore delete method (call on full path collection-> document to be deleted)
        var docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.get()
            .then((doc) => {
                var url = doc.data().imageURL;
                // toast.info('😾 Share your image using: ' + url, {
                //     position: "bottom-center",
                //     autoClose: 2500,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: true,
                //     progress: undefined,
                // });
                this.state.imageLink = url;
                this.state.imageAvaiable = true;
                navigator.clipboard.writeText(url);
                this.setUserNotifications("Congratulations you have shared an image!");
            }).catch((error) => {
                toast.info('😾 Error getting image URL ' + error, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    deletePicHandler = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore delete method (call on full path collection-> document to be deleted)
        var docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.delete()
            //advise if successful or unsuccessful delete
            .then(() => {
                toast.info('😾 Successfully deleted image', {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }).catch((error) => {
                toast.info('😾 Error deleting photo : ' + error, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            });
    }
    setCountry = () => {
        //get the firestore document ID for the selected image
        var getDocID = this.state.docs[this.state.carouselIndex].id;
        //use firestore delete method (call on full path collection-> document to be deleted)
        var docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("images").doc(getDocID);
        docPath.update({ country: this.state.settingCountry })
            //advise if successful or unsuccessful delete
            .then(() => {
                toast.info('😾 Successfully updated country for this image: ' + this.state.settingCountry, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }).catch((error) => {
                toast.info('😾 Error updating country for this image ' + error, {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    getCountryList = () => {
        //get the country list from the trips collection in firestore
        //we want users to upload a trip before uploading photos so we only want them to be able to select from these countries
        let docPath = firestore.collection("users").doc(localStorage.getItem("uid")).collection("trips")
        docPath.onSnapshot((snap) => {
            if (snap.empty) {
                alert("No trips added yet. Please add in the trips tab!");
                console.log("Firestore trips collection empty");
            } else {
                let countryListArray = [];
                snap.forEach(doc => {
                    countryListArray.push({ ...doc.data(), id: doc.id }); //push data and the unique firestore doc id to the array documents
                });
                this.setState({ countryList: countryListArray })
                console.log(this.state.countryList);
            }
        })
    }

    render() {
        const image = this.state.image;
        //sets the allowed file types that can be uploaded
        const types = ['image/jpeg', 'image/png'];
        const docs = this.state.docs;
        var currentGallery = firestore
            .collection("users")
            .doc(localStorage.getItem("uid"))
            .collection("images")

        const changeHandler = (event) => {
            let photo = event.target.files[0];
            //confirms that the correct file types have been uploaded
            if (types.includes(photo.type)) {
                this.setState({ image: photo });
            } else {
                //if error
                photo = null; //removes file from photo variable if not image
                alert("Please upload an image file (jpeg or png)");
            }
        };

        const handleSubmission = () => {
            if (image != null) { //stops errors if user tries to upload non-image file type
                //show progress bar
                this.setState({ showProgressBar: true });
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
                            this.setState({ progress: percentage }); //update state progress
                        },
                        error => { //if error
                            console.log(error);
                            //hide progress bar after 2 sec
                            setTimeout(() => this.setState({ showProgressBar: false }), 3000);
                        },
                        async () => {
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
                                name: image.name
                            });
                            //hide progress bar after 2 sec
                            setTimeout(() => this.setState({ showProgressBar: false }), 3000);
                        }
                    )

                this.setUserNotifications("You have uploaded an image!");


                toast.info('😾 You have uploaded an image!', {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        };

        const showPhotos = () => {
            this.setState({ docs: [] });
            currentGallery
                .onSnapshot((snap) => {
                    if (snap.empty) {
                        console.log("Docs is empty");
                    } else {
                        let documents = [];
                        snap.forEach(doc => {
                            documents.push({ ...doc.data(), id: doc.id }); //push data and the unique firestore doc id to the array documents
                        });
                        this.setState({ docs: documents }); //update state with the documents array
                        console.log(docs); //check
                    }
                })
        }

        const showFavourites = () => {
            this.setState({ docs: [] });
            currentGallery
                .onSnapshot((snap) => {
                    if (snap.empty) {
                        console.log("Docs is empty");
                    } else {
                        let documents = [];
                        snap.forEach(doc => {
                            if (doc.data().favourites)
                                documents.push({ ...doc.data(), id: doc.id }); //push data and the unique firestore doc id to the array documents
                        });
                        this.setState({ docs: documents }); //update state with the documents array
                        console.log(docs); //check
                    }
                })
        }

        const showCountry = (id) => {
            let countryName = id.toLowerCase();
            console.log(countryName);
            this.setState({ docs: [] });
            currentGallery
                .onSnapshot((snap) => {
                    if (snap.empty) {
                        console.log("Docs is empty");
                    } else {
                        let documents = [];
                        snap.forEach(doc => {
                            if (doc.data().country === null) console.log("country empty")
                            if (doc.data().country.toLowerCase() === countryName)
                                documents.push({ ...doc.data(), id: doc.id }); //push data and the unique firestore doc id to the array documents
                        });
                        this.setState({ docs: documents }); //update state with the documents array
                        console.log(docs); //check
                    }
                })
        }

        //method that will build carousel items (one item for each picture in doc array)
        const cItems = (docs && docs.map(doc => {
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
            <Popover.Title as="h2" className="text-center buttonStyle white-text">Picture Menu</Popover.Title>
            <Popover.Content
                onFocus={() => this.stopSliding()}
                onMouseMove={() => this.stopSliding()}
                //start sliding with timemout method to to give mouse a chance to enter carousel
                onMouseLeave={() => this.setState(
                    { picMenuTimeoutID: [...this.state.picMenuTimeoutID, setTimeout(() => this.startSliding(), 3000)] })}
            >
                <Container>
                    <Row className="pb-1">
                        <Col>
                            <InputGroup fluid="true" className="mb-1">
                                <FormControl
                                    placeholder="Picture Comment"
                                    aria-label="Picture Comment"
                                    className="galery_med_text"
                                    onChange={event => {
                                        this.setState({ picComment: event.target.value });
                                    }}
                                />
                                <InputGroup.Append onClick={() => this.setUserNotifications("You have added a comment to an image!")}>
                                    <Button variant="outline-info" className="galery_med_text" onClick={this.commentPicHandler}>Add Comment</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="pb-1">
                        <Col >
                            <Button block variant="outline-info" className="galery_med_text" onClick={this.sharePicHandler}>Share</Button>
                        </Col>

                    </Row>
                    <Row className="pb-1">
                        <Col>
                            <Button block variant="outline-info" className="galery_med_text" onClick={this.addToFavouritesHandler}>Add to Favourites</Button>
                        </Col>
                    </Row>
                    <Row className="pb-1">
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Country"
                                    aria-label="Country"
                                    className="galery_med_text"
                                    onChange={event => {
                                        this.setState({ settingCountry: event.target.value });
                                    }}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-info" className="galery_med_text" onClick={this.setCountry}> Set Country </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="pb-1" onClick={() => this.setUserNotifications("You have deleted an image!")}>
                        <Col>
                            <Button block variant="outline-dark" className="galery_med_text" onClick={this.deletePicHandler}>Delete</Button>
                        </Col>
                    </Row>
                </Container>
            </Popover.Content>
        </Popover>
        //method that will build thumnails pictures
        const tItems = (docs && docs.map(doc => {
            return <Col xs={6} md={2} className="col-2" key={doc.id}>
                <Image src={doc.imageURL} alt="users-travel-pic" rounded
                    doc_id={doc.id}
                    onClick={this.thumbnailClick}
                    className={this.state.selectedThumbnail == doc.id ? "img-thumbnail galery-thumbnail" : "img-thumbnail"} />
            </Col>
        }));
        return (
            <Container fluid="true" className="Gallery pl-2">
                <Row>
                    {/* shows photo upload progress to user */}
                    <ProgressBar animated now={this.state.progress} label={this.state.progress + '%'}
                        className={this.state.showProgressBar == true ? "d-inline-flex" : "d-none"}
                        variant="dark" />
                </Row>
                <Row>
                    <Col xs={2} className="pl-4">
                        <Row>
                            <p className="h5 pt-5">Upload Menu</p>
                            {/*Acordion inspired from https://react-bootstrap.netlify.app/components/accordion/#accordion */}
                            <Accordion className="w-100">
                                <Card className="w-100">
                                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center buttonStyle white-text">
                                        ADD PICTURES
                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control as="select" id="country" className="galery_small_text select_center_align" onChange={this.addCountry}>
                                                        <option key='blankChoice' hidden value className="galery_small_text" >Choose Country</option>
                                                        {this.state.countryList.map((c) => (
                                                            <option block="true" key={c.id}>{c.id}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                {/* inspired from: https://react-bootstrap.netlify.app/components/forms/#forms-custom-file*/}
                                                <Form.Group>
                                                    <Form.File className="text-left galery_small_text"
                                                        id="custom-file"
                                                        label="Choose file"
                                                        custom
                                                        multiple onChange={changeHandler}
                                                    />
                                                </Form.Group>
                                                <Row>
                                                    <Col >
                                                        <Button block className="float-right" variant="outline-info" size="sm" id="uploadphoto-button" onClick={handleSubmission}>Upload</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Row>
                        <Row>
                            <p className="h5 pt-5">Photo Library</p>
                            <Row >
                                {/* showPhotos(), showFavourites() and showCountry() update the docs array in state
                    which controls which photos are shown to the user at any time  */}
                                <Button variant="info" className="ml-3 pb-2 mb-1" size="m" onClick={showPhotos} > PHOTOS </Button>
                                <Button variant="info" className="ml-3 pb-2 mb-1" size="m" onClick={showFavourites} > FAVOURITES </Button>
                            </Row>
                            <Dropdown id="galeryCountry" title="Select Trip Country">
                                <Dropdown.Toggle className="w-100 buttonStyle">
                                    COUNTRY
                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100" >
                                    {this.state.countryList.map((country, index) => (
                                        <Dropdown.Item key={index} onClick={() => showCountry(country.id)}>{
                                            <Container className="p-1">
                                                <Row>
                                                    <Col className="col-6 text-left galery_small_text">
                                                        {country.id}
                                                    </Col>
                                                    <Col />
                                                </Row>
                                            </Container>
                                        }
                                        </Dropdown.Item>
                                    ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>
                    </Col>
                    <Col/>
                    <Col xs={7} className="pl-4">
                        <Row className={this.state.docs.length === 0 ? "d-none" : "contactUs p-3 coarouselMaxWidth"}>
                            <Row className="pb-2 ">
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
                                            this.setState({
                                                carouselStartTimeoutID: [...this.state.carouselStartTimeoutID, setTimeout(() => this.startSliding(), 3000)]
                                            })
                                        }>
                                        {cItems} </Carousel>
                                </OverlayTrigger>
                            </Row>
                            <Row className="no-gutters galery-thumbnail-row">
                                {tItems}
                            </Row>
                        </Row>
                    </Col>
                    <Col xs={2} />
                </Row>


                <ToastContainer
                    position="bottom-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <ToastContainer />

                {this.state.imageAvaiable ?
                    <Row>
                        {this.state.imageAvaiable = false}
                        {toast.info('😾 Image added to your clipboard!', {
                            position: "bottom-center",
                            autoClose: 2500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        })}
                    </Row>
                    : ""}
            </Container>
        )


    }
}
export default Gallery;