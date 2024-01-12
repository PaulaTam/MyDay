import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './ProfilePage.css';

const Profile = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        <Container className="profile-page-container">
            <h1>Profile Page</h1>

            <Row className="profile-page-row">
            <h4>First Name:</h4>
            <p>{ user.firstname }</p>
            </Row>

            <Row className="profile-page-row">
            <h4>Last Name:</h4>
            <p>{ user.lastname }</p>
            </Row>

            <Row className="profile-page-row">
            <h4>SFSU ID:</h4>
            <p>{ user.sfsuid }</p>
            </Row>

            <Row className="profile-page-row">
            <h4>Major:</h4>
            <p>{ user.major }</p>
            </Row>

        </Container>

    )
}

export default Profile;