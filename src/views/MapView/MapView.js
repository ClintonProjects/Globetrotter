import React, { Component } from 'react';
import Map from '../../components/Map/Map.js';
import Footer from '../../components/footer/Footer.js';
import NavBar from '../../components/NavBar/NavBar.js';


import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

class Preloginmap extends Component {
    render() {
        return (
            <div>
                <div class="row text-center">
                    <Map />
                </div>
            </div>
        );
    }
}

export default Preloginmap;
