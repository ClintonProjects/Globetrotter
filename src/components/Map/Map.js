import React, { Component } from "react";
import "./Map.css";
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

        // draw the countries using polygons
        let polygonSeries = new am4maps.MapPolygonSeries();
        map.series.push(polygonSeries);
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ"];

        let polygonTemplate = polygonSeries.mapPolygons.template;
        // set base color for map
        // polygonTemplate.fill = am4core.color("#98FB98");

        polygonSeries.data = [{
            "id": "IE",
            "name": "Ireland",
            "fill": am4core.color("#000")
          }, {
            "id": "IT",
            "name": "Italy",
            "fill": am4core.color("#000")
          }, {
            "id": "ES",
            "name": "Spain",
            "fill": am4core.color("#000")
          }, {
            "id": "SE",
            "name": "Sweden",
            "fill": am4core.color("#000")
          }, {
            "id": "JP",
            "name": "Japan",
            "fill": am4core.color("#000")
          }];
          polygonTemplate.propertyFields.fill = "fill";

          this.map = map;
    }
    componentWillUnmount() {
        if (this.map) {
          this.map.dispose();
        }
    }
  render() {
    return (
        <>
        <div id="map"></div>
        </>
    );
  }
}

export default Map;
