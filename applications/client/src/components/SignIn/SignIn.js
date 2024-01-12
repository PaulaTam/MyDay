import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
//import { getStudentInfo } from "../../actions/auth"; //use this for form authentication, not implemented yet
import { useNavigate } from "react-router-dom"; //might use to make the Button redirect to home page after authentication
import "bootstrap/dist/css/bootstrap.css";
import "./SignIn.css";
import { signin } from "../../actions/auth";

export const SignIn = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [signInData, setSignInData] = useState({ sfsuid: "", password: "" });
    const [show, setShow] = useState(true);
    const [err, setErr] = useState("");
    let navigate = useNavigate();




    const toHome = () => {
        let path = '/';
        navigate(path);
    };

    // redirect user to home page if already logged in
    useEffect(() => {
        if (user?.sfsuid) {
            toHome();
        }
    }, []);

    if (user?.sfsuid) {
        return;
    }

    function SignInAlertDismissible() {
        if (show) {
            return (
                <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{err}</Alert.Heading>
                </Alert>
            );
        }
    }

    const setSignInOnChange = () => {
        if (show) {
            setShow(false);
            setErr("");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        signin(signInData).then((res) => {

            let { data } = res;

            if (data === undefined && !res?.response?.data) {
                setShow(true);
                setErr("500 Internal Server Error");

            }

            else if (res?.response?.data) {
                setShow(true);
                setErr(res?.response?.data);

            }

            else {
                localStorage.setItem("profile", JSON.stringify(data));
                window.location.replace("/home");
            }

        }).catch((err) => console.log(err));
    };

    return (
        <>
            {err && <SignInAlertDismissible />}
            <div className="formContainer">
                <Form className="form-container" onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formSFSUID" onChange={(e) => { setSignInData({ ...signInData, sfsuid: e.target.value }); setSignInOnChange(); }}>
                        <Form.Label>SFSU ID</Form.Label>
                        <Form.Control type="number" placeholder="Enter SFSU ID here"></Form.Control>
                        <Form.Text>Your SFSU ID is 9 digits long.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword" onChange={(e) => { setSignInData({ ...signInData, password: e.target.value }); setSignInOnChange(); }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password here"></Form.Control>
                    </Form.Group>
                    <div className="button-container">
                        <Button variant="custom" type="submit">Sign In</Button>
                        <Button variant="custom" type="button" href="/signup">Don't Have an Account? Sign Up</Button>
                    </div>
                </Form>

            </div>
        </>
    );
};