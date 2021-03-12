import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import RegisterMessage from '../../components/Pre-LoginMap/RegisterMessage';
import Map from '../../components/Pre-LoginMap/Map.js';
import Foorter from '../../components/footer/Footer';

class Preloginmap extends Component {
    render() {
        return (
            <div>
                {/* <div class="col-sm-12"> */}
                    <NavBar />
                    <RegisterMessage />
                    <Map />
                    <Foorter />
                {/* </div> */}
            </div>
        );
    }
}

export default Preloginmap;
