import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import RegisterMessage from '../../components/Pre-LoginMap/RegisterMessage';
import Map from '../../components/Pre-LoginMap/Map.js';
import Foorter from '../../components/footer/Footer';
import { Route } from 'react-router';

class Preloginmap extends Component {
    render() {
        return (
            <div class="row text-center">
                <NavBar />
                <RegisterMessage />
                <Map />
                <Foorter />
            </div>
        );
    }
}

export default Preloginmap;
