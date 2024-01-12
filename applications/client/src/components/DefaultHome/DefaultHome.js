import React from "react";
import {Button} from "react-bootstrap";
import "./DefaultHome.css";
import Logo from "../../images/logo.png";

export const DefaultHome = () => {
    return (
        <div className="content">
            <div className="banner">
                <h1 className="text-header">Welcome to MyDay!</h1>
            </div>

            <div className="about-text" id="main">
                <h2 className="text-header"> Plan Your Day with MyDay! </h2>
                <p className="text-desc">
                    MyDay helps you achieve a work-life balance and accomplish your goals.
                </p>
                <div className="button-grid">
                    <Button variant="custom" href="/signin">Sign In</Button>
                    <Button variant="custom" href="/signup">Sign Up</Button>
                </div>
            </div>

            <div className="home-image-container" id="main">
                <img className="home-image"
                    src={Logo} 
                    alt="Scheduler Logo"/>
            </div>
        </div>
    )
};

