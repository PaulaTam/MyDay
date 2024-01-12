import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NavigationBar.css";
import { useNavigate } from 'react-router-dom';
import AccountLogo from "../../images/account.png";
import ProfileLogo from "../../images/profile.png";
import SignInLogo from "../../images/signin.png";
import SignUpLogo from "../../images/signup.png";
import SettingLogo from "../../images/setting.png";
import SignOutLogo from "../../images/signout.png";

export const NavigationBar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const navigate = useNavigate();
    const accountImgHeight = "40px";
    const accountImgWidth = "40px";

    const logOut = () => {
        navigate("/signin");
        setUser(null);
        localStorage.clear('profile');
    };


    useEffect(() => {
        const token = user?.token;

        //check if token expired to sign out user
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }
    }, [location]);


    const NaviBar = () => {
        return (
            <Navbar>
                <Container fluid>
                    <Navbar.Brand><a href="/home" className="nav-logo" data-testid="nav-brand">My Day</a></Navbar.Brand>

                    <Nav
                        className="ms-auto my-2 my-lg-0"
                    >

                            {
                                user ?
                                    <NavDropdown id="navbarScrollingDropdown"
                                        data-testid="nav-dropdown"
                                        title={

                                        <div className="pull-left">
                                            <img className="thumbnail-image"
                                                height={accountImgHeight}
                                                width={accountImgWidth}
                                                src={AccountLogo}
                                                alt="user pic"
                                            />

                                            </div>
                                        }>
                                        <NavDropdown.Item href="/profile">
                                            Profile
                                            <img className="thumbnail-image"
                                                src={ProfileLogo}
                                                alt="user pic"
                                            />
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/about"
                                            data-testid="about-us">
                                            About Us
                                            <img className="thumbnail-image"
                                                src={ProfileLogo}
                                                alt="user pic"
                                            />
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logOut}>
                                            Sign out
                                            <img className="thumbnail-image"
                                                src={SignOutLogo}
                                                alt="user pic"
                                            />
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                    :
                                    <NavDropdown id="navbarScrollingDropdown"
                                        data-testid="nav-dropdown"
                                        title={

                                        <div className="pull-left">
                                            <img className="thumbnail-image"
                                                src={AccountLogo}
                                                height={accountImgHeight}
                                                width={accountImgWidth}
                                                alt="user pic"
                                            />

                                            </div>
                                        }>
                                        <NavDropdown.Item href="/signin">
                                            Sign In
                                            <img className="thumbnail-image"
                                                src={SignInLogo}
                                                alt="user pic"
                                            />
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/signup">
                                            Sign Up
                                            <img className="thumbnail-image"
                                                src={SignUpLogo}
                                                alt="user pic"
                                            />
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/about"
                                            data-testid="about-us">
                                            About Us
                                            <img className="thumbnail-image"
                                                src={ProfileLogo}
                                                alt="user pic"
                                            />
                                        </NavDropdown.Item>
                                    </NavDropdown>
                            }
                        </Nav>

                </Container>
            </Navbar>
        );
    };

    return (
        <NaviBar />
    );
};