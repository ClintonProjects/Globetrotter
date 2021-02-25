import React, { Component } from "react";
import Login from "./components/login/login";
import About from "./components/about/About";
import NavBar from "./components/NavBar/NavBar";
class App extends Component {
    render() {
        return ( 
        <div className = "App" > Team 9 test 
        <NavBar/>
        <Login/>

        <About></About>
        
        </div>
        );
    }
}
export default App;
