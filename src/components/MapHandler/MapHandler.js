import React, { Component } from "react";
import Firebase from "firebase/app";
import 'firebase/auth';
import Preloginmap from "../../views/PreLoginMap/Preloginmap";
import MapView from "../../views/MapView/MapView.js";

import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

;
class Profile extends Component {
    render() {
        const authenticated = this.props.authenticated;
        const currentUser = this.props.currentUser;
        return (
            <div>
                {authenticated && <Preloginmap />}
                {!authenticated && <MapView />}

            </div>
        )

    }
}
export default Profile;