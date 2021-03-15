import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import Login from '../../components/login/login';
import Foorter from '../../components/footer/Footer';

class Preloginmap extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Login />
                <Foorter />
            </div>
        );
    }
}

export default Preloginmap;
