import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { callBackEnd } from "../../actions/testbackend";
import { getStudentInfo } from "../../actions/auth";
import { DefaultHome } from '../../components/DefaultHome';
import "./Home.css";
import { Scheduler } from '../../components/Scheduler';

export const Home = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [msg, setMsg] = useState("");
    const [sid, setSid] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        callBackEnd().then((response) => {
            setMsg(response.data.message);
        }).catch((err) => {
            setMsg("Cannot connect to backend");
        });

    }, []);

    const sumbitStudentId = () => {
        getStudentInfo(sid).then((response) => {
            const { data } = response;
            if (data.length > 0) {
                setStudentData([...data]);
            }

            else {
                setStudentData([]);
                setErrMsg("No student with that id found...");
            }

        }).catch((err) => {
            setStudentData([]);
            setErrMsg("Error retrieving student info");
        });
    };

    return (
        <div>
            {/*<h1>Home Page</h1>
            <Link className="about-link" to='/about' >About</Link>
            <h4>{msg}</h4>
            <input type="number" placeholder="StudentId" onChange={(e) => setSid(e.target.value)} />
            <button type="button" onClick={sumbitStudentId}>Submit</button>
            <br></br>
            <br></br>
            <h2>User Data</h2>
            {
                studentData.length > 0 ? studentData.map((elem, id) => {
                    return (
                        <div key={id}>
                            <h4>sfsuid: {elem.sfsuid} </h4>
                            <h4>firstname: {elem.firstname} </h4>
                            <h4>lastname: {elem.lastname} </h4>
                            <h4>major: {elem.major} </h4>
                        </div>
                    );
                }) : <h4>{errMsg}</h4>
            }*/}
            {user ? <Scheduler /> : <DefaultHome />}
        </div>
    );
};