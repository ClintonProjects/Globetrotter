import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import geodata from "@amcharts/amcharts4-geodata/worldLow";

class Map extends Component {
  render() {
    return (
        <>
        <div id="map"></div>
        </>
    );
  }
}

export default Map;
