import React, { Component } from 'react';
import RegisterMessage from '../../components/Pre-LoginMap/RegisterMessage';
import Map from '../../components/Pre-LoginMap/Map.js';
import { Route } from 'react-router';

class Preloginmap extends Component {
    render() {
        return (
            <div class="row text-center">
                
                <RegisterMessage />
                <Map />
               
            </div>
        );
    }
}

export default Preloginmap;
