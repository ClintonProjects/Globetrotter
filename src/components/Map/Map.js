import React, { Component } from "react";
import { renderToString } from "react-dom/server";
import "./Map.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import geodata from "@amcharts/amcharts4-geodata/worldLow";
import albums from "./img/albums30x30.png";
import pictures from "./img/pictures30x30.png";
import newAlbum from "./img/newAlbum30x30.png";
import guestView from "./img/guestView30x30.png";
import firebase from "../myFirebaseConfig.js"; // import the firebase app
import "firebase/firestore"; // attach firestore
import { Container, Row, Col, Button } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore();

class Map extends Component {
  constructor(props) {
    super(props);
    // set the reference paths for locations and trips in firestore database
    // use localStorage.getItem("uid") to find path to user specific data
    // localStorage uid is set when user registers / logs in
    this.state = {
      locationRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("locations"),
      tripRef: firestore
        .collection("users")
        .doc(localStorage.getItem("uid"))
        .collection("trips"),
    };
  }

  componentDidMount() {
    // onSnapshot listens for any changes in the document on firebase
    // pull data from user specific locations on database change
    this.state.locationRef.onSnapshot((doc) => {
      if (doc.empty) {
        console.log("no data");
      } else {
        const array = []; // all locations retrieved and saved to 'array'
        doc.forEach((data) => {
          const location = data.data().location;
          array.push(location); // each location stored in array
        });

        // after array is populated, instantiate map with locations from here
        // first
        // instantiate the map object
        let map = am4core.create("chartdiv", am4maps.MapChart);

        // provide the map object with a definition (GEOJSON format from API)
        map.geodata = geodata;

        // set the map projection type
        map.projection = new am4maps.projections.NaturalEarth1();

        // draw the countries using polygons
        let polygonSeries = new am4maps.MapPolygonSeries();
        map.series.push(polygonSeries);
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ"];

        let polygonTemplate = polygonSeries.mapPolygons.template;

        // uncomment below to set base color for map
        // polygonTemplate.fill = am4core.color("#98FB98");

        // array retrieved from firestore gets assigned to polygonSeries here
        polygonSeries.data = array;

        // create the tooltip and show on hover of country
        polygonSeries.calculateVisualCenter = true;
        polygonSeries.tooltip.label.interactionsEnabled = true;
        polygonSeries.tooltip.keepTargetHover = true;
        polygonTemplate.tooltipPosition = "fixed";

        //logged in user
        polygonTemplate.tooltipHTML = renderToString(
          this.buildTooltipMenu("{name}")
        );

        //guest user
        //polygonTemplate.tooltipHTML = renderToString(this.buildTooltipMenuGuest('{name}'));

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#17a2b8");

        polygonTemplate.propertyFields.fill = "fill"; // fill in countries

        this.map = map;
      }
    });
  }

  componentWillUnmount() {
    // needed on reccomendation of API docs as it disposes the maps on exit
    // cleaner and more efficient
    if (this.map) {
      this.map.dispose();
    }
  }

  //For logged in user
  buildTooltipMenu = (name) => {
    return (
      // <Container className="Gallery pl-2 tooltip-menu">
      <Container className="tooltip_wrrapper">
        <Row className="font-weight-bold tooltip-menu-countryName">
          <Col>
            <label>{name}</label>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col xs={10} className="pl-4 ">
            <img
              title="Browse albums"
              className="tooltip-menu-icons"
              src={albums}
            />
            <p className="tooltip-menu-text"> 5 </p>{" "}
            {/*TODO: get real data from system*/}
            <img
              title="Browse pictures"
              className="tooltip-menu-icons"
              src={pictures}
            />
            <p className="tooltip-menu-text"> 25 </p>{" "}
            {/*TODO: get real data from system*/}
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <Button
              block
              size="sm"
              variant="info"
              className="mt-1 galery_med_text"
            >
              ADD NEW TRIP
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              block
              size="sm"
              variant="info"
              className="mt-1 galery_med_text"
            >
              SEE PHOTOS
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };
  //For guest users
  buildTooltipMenuGuest = (name) => {
    return (
      <div className="tooltip-menu">
        <div className="tooltip-menu-countryName">
          {name}
          <div className="tooltip-menu-icons-container-small">
            <img
              title="Browse pictures"
              className="tooltip-menu-icons"
              src={guestView}
            />
            <div className="tooltip-menu-text"> 25 </div>{" "}
            {/*TODO: get real data from system*/}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div className="chartwrapper" id="map">
          <div id="chartdiv" className="chartdiv"></div>
        </div>
      </>
    );
  }
}

export default Map;
