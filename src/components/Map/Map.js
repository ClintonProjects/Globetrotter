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

// declare global variable for use in componentDidMount & addData
const firestore = firebase.firestore();

class Map extends Component {
  constructor(props) {
    super(props);
    // no on below - constructor is called only once, so will stick to 1st state
    // determine the uid bases on authentication being true or false
    // var uid = this.props.authenticated ? this.props.currentUser.uid : 1;
    // set below to the demo user uid
    this.state = {
      docRef: firestore.collection("users").doc("K26KJF569YU6gNaIZOySCG6uoGB2"),
      locationRef: firestore
        .collection("users")
        .doc("K26KJF569YU6gNaIZOySCG6uoGB2")
        .collection("locations"),
      tripRef: firestore
        .collection("users")
        .doc("K26KJF569YU6gNaIZOySCG6uoGB2")
        .collection("trips"),
    };
  }

  componentDidMount() {
    // onSnapshot listens for any changes in the document on firebase
    this.state.locationRef.onSnapshot((doc) => {
      if (doc.empty) {
        console.log("no data");
      } else {
        const array = [];
        doc.forEach((data) => {
          const location = data.data().location;
          array.push(location);
        });

        // after array has been populated, instantiate map with locations
        // instantiate the map object
        let map = am4core.create("chartdiv", am4maps.MapChart);

        // provide the map object with a definition (GEOJSON)
        map.geodata = geodata;

        // set the map projection type
        map.projection = new am4maps.projections.NaturalEarth1();

        // draw the countries using polygons
        let polygonSeries = new am4maps.MapPolygonSeries();
        map.series.push(polygonSeries);
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ"];

        let polygonTemplate = polygonSeries.mapPolygons.template;
        // set base color for map
        // polygonTemplate.fill = am4core.color("#98FB98");

        // array retrieved from firestore gets assigned to data here
        polygonSeries.data = array;

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
        hs.properties.fill = am4core.color("#616b61");

        polygonTemplate.propertyFields.fill = "fill"; // fill in countries

        this.map = map;
      }
    });
  }
  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    if (this.props.currentUser !== prevProps.currentUser) {
      this.state = {
        docRef: firestore
          .collection("users")
          .doc(`${this.props.currentUser.uid}`),
        locationRef: firestore
          .collection("users")
          .doc(`${this.props.currentUser.uid}`)
          .collection("locations"),
        tripRef: firestore
          .collection("users")
          .doc(`${this.props.currentUser.uid}`)
          .collection("trips"),
      };
      this.componentDidMount();
    }
  }
  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  //For logged in user
  buildTooltipMenu = (name) => {
    return (
      <div className="tooltip-menu">
        <div className="tooltip-menu-countryName">
          {name}
          <div className="tooltip-menu-icons-container">
            <img
              title="Browse albums"
              className="tooltip-menu-icons"
              src={albums}
            />
            <div className="tooltip-menu-text"> 5 </div>{" "}
            {/*TODO: get real data from system*/}
            <img
              title="Browse pictures"
              className="tooltip-menu-icons"
              src={pictures}
            />
            <div className="tooltip-menu-text"> 25 </div>{" "}
            {/*TODO: get real data from system*/}
            <img
              title="Create a new albums"
              className="tooltip-menu-icons"
              src={newAlbum}
            />
          </div>
        </div>
      </div>
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
