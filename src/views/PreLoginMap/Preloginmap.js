import React, { Component } from 'react';
import RegisterMessage from '../../components/Pre-LoginMap/RegisterMessage';
// import Map from '../../components/Map/Map.js';
import { Route } from 'react-router';
import Footer from '../../components/footer/Footer.js';
import NavBar from '../../components/NavBar/NavBar.js';
import DemoMap from './demo_map.png';

import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

class Preloginmap extends Component {
    render() {
        //const authenticated = this.props.authenticated;
        //console.log(authenticated);
        return (
            <div>
                {/* {!authenticated && ( */}
                    <RegisterMessage />
                {/* )} */}
                {/* {!authenticated && ( */}
                    <Link to="/login"><img src={DemoMap} alt="" /></Link>
                {/* )} */}
            </div>
        );
    }
}

export default Preloginmap;
