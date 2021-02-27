import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import geodata from "@amcharts/amcharts4-geodata/worldLow";

class Map extends Component {
    componentDidMount(){
        // instantiate the map object
        let map = am4core.create("map", am4maps.MapChart);

        // provide the map object with a definition (GEOJSON)
        map.geodata = geodata;

        // set the map projection type
        map.projection = new am4maps.projections.NaturalEarth1();
  render() {
    return (
        <>
        <div id="map"></div>
        </>
    );
  }
}

export default Map;
