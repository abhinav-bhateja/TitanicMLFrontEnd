import React from 'react'
import './App.css';

import Predict from './components/Predict'
import {Navbar} from "react-bootstrap";

function App() {

    return (
        <div className="app">
            <Navbar className="nav" variant="dark">
                <Navbar.Brand href="#home">
                    Titanic Prediction Model
                </Navbar.Brand>
            </Navbar>

            <Predict />
        </div>
    );

}

export default App;
