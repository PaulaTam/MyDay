import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './registration.css';
import "bootstrap/dist/css/bootstrap.css";
import { signup } from "../../actions/auth";

export function RegistrationForm() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [show, setShow] = useState(true);
    const [err, setErr] = useState("");

    let navigate = useNavigate();


    // redirect user to home page if already logged in
    useEffect(() => {
        if (user?.sfsuid) {
            navigate("/home");
        }
    }, []);

    if (user?.sfsuid) {
        return;
    }

    const onSubmit = (regData) => {
  
        setShow(false);
        signup(regData).then((res) => {
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
        })
            .catch((err) => console.log(err));
    };

    function SignInAlertDismissible() {
        if (show) {
            return (
                <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{err}</Alert.Heading>
                </Alert>
            );
        }
    }

    return (
        <>
            {err && <SignInAlertDismissible />}
            <div className="form">
                <Form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            placeholder="First Name"
                            {...register("firstname", {
                                required: "Please enter your first name."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstname?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            placeholder="Last Name"
                            {...register("lastname", {
                                required: 'Please enter your last name.'
                            })}
                        />
                        <Form.Control.Feedback type="invalid" id="feedback">{errors.lastname?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sfsuid">
                        <Form.Label>SFSU ID</Form.Label>
                        <Form.Control
                            placeholder="SFSU ID"
                            {...register("sfsuid", {
                                required: 'Please enter your SFSU ID.',
                                pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: 'SFSU IDs are 9-digits long.'
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.sfsuid?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="major">
                        <Form.Label>Major</Form.Label>
                        <Form.Control
                            placeholder="Major"
                            {...register("major", {
                                required: "Please enter your major."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.major?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="minor">
                        <Form.Label>Minor</Form.Label>
                        <Form.Control
                            placeholder="Minor (optional)"
                            {...register("minor")}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Please create a password",
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W){8,}/,
                                    message: "Password MUST be at least 8 characters, have at least one uppercase letter, one lowercase letter, one number and one special character."
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cpassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            {...register("cpassword", {
                                required: "Please confirm your password",
                                validate: (val) => {
                                    if (val !== getValues("password")) {
                                        return "Passwords don't match!";
                                    }
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.cpassword?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="button-container">
                    <Button variant="custom" type="submit" className="button">Register</Button>
                    <Button variant="custom" type="button" href="/signin">Already Have an Account? Sign In</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}
