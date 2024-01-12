import React from "react";
import { Link } from "react-router-dom";

const About = () => {

    return (
        <div className="about-container">
            <h2>Software Engineering class SFSU</h2>
            <h2>Fall 2022</h2>
            <h2>Section 04</h2>
            <h2>Team 07</h2>

            <Link to="/">Back to Home</Link>
            <br></br>
            <br></br>
            <button type="button">
                <Link to="/aboutnya">Nya Avelina Bautista</Link>
            </button>
            <br></br>
            <button type="button">
                <Link to="/AboutChristine">Christine J'usrey</Link>
            </button>
            <br></br>
            <button type="button">
                <Link to="/aboutpaula">Paula Abigail Tam</Link>
            </button>
            <br></br>
            <button type="button">
                <Link to="/aboutfrancis">Francis Ranallo</Link>
            </button>
            <br></br>
            <button type="button">
                <Link to="/abouthenry">Henry Cai</Link>
            </button>

            <h1>Meeting Times</h1>
            <ul>
                <li> Mondays during/after class (If no class on Monday, then we’ll meet Wednesday at 2:30PM) </li>
                <li>Fridays at 1PM</li>
            </ul>

            <h1>Communication Channels</h1>
            <p>We communicate through Discord and text messages.</p>

            <h1>Study Schedules</h1>
            <p>
                Throughout the week, the Front End lead and Back ENd lead will send out resources they find best for us to study from and we will discuss our new findings each meeting.
                During our meetings, we will additionally be taking notes on our findings and what we should do before our next meeting.
            </p>

        </div>
    )

}

export default About;