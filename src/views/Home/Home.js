import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Home extends Component {


    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className='Home'>
                <button onClick={() => this.nextPath('/preloginmap')}>
                    change path
                </button>
            </div>
        );
    }
}

export default Home;
