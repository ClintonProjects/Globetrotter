import React, { Component } from 'react';
import Login from "../login/login.js";
import Logout from "../login/logout.js";
import Rego from "../login/rego.js";
import Firebase from "firebase/app";
import 'firebase/auth';
import './User.css';

class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          logIn: true,
          register: false,
          loggedIn: false,
        };

        this.userLogIn = this.userLogIn.bind(this);
        this.userRegister = this.userRegister.bind(this);
    }
    userLogIn(){
        this.setState({ logIn: true});
        this.setState({ register: false});
    }
    userRegister(){
        this.setState({ register: true});
        this.setState({ logIn: false});
    }
    render() {
        let logIn = this.state.logIn;
        let register = this.state.register;
        let loggedIn = this.state.loggedIn;
        
        return (
            <div className='User'>
                <button className="user-login-btn" onClick={()=>this.userLogIn()}>Sign In</button>
                <button className="user-reg-btn" onClick={()=>this.userRegister()}>Register</button>
                {logIn == true &&<Login/>}
                {register == true&& <Rego/>}
                {loggedIn == true &&<Logout/>}
                
            </div>
        );
    }
}

export default User;