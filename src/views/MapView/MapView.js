import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import Map from '../../components/Map/Map.js';

class MapView extends Component {
    render() {
        return (
            <div className='MapView'>
                <NavBar />
                <Map />
            </div>
        );
    }
}

export default MapView;
