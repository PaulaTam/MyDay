import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import "./Map.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
export const Map = () => {

    // scheduler data passed from scheduler page
    const { state } = useLocation();
    const [dirRes, setDirRes] = useState(null);
    const [dis, setDis] = useState("0");
    const [dur, setDur] = useState("0");
    const [schedulerEventOrigin, setSchedulerEventOrigin] = useState("");
    const [schedulerEventDest, setSchedulerEventDest] = useState("");
    const manualOriginRef = useRef('');
    const manualDestRef = useRef('');
    const center = { lat: 37.724055832155365, lng: -122.48013362154612 };
    const mapZoom = 15;
    const schedulerEventWaitTimeInMilliSec = 1000;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOG_MAP_API_KEY,
        libraries: ["places"]
    });

    function DataGrid() {
        return (
            <Container className="map-data-grid-container">
                <Row className="map-data-grid-row">
                    <Col className="map-data-grid-column" md={4} >
                        <Autocomplete>
                            <input className="map-data" ref={manualOriginRef} type='text' placeholder="Origin" />
                        </Autocomplete>

                    </Col>
                    <Col className="map-data-grid-column" md={4} >
                        <Autocomplete>
                            <input className="map-data" ref={manualDestRef} type='text' placeholder="Destination" />
                        </Autocomplete>

                        <button className="map-data" type='button' onClick={calcRouteManually}>Submit</button>
                    </Col>

                </Row>
                <Row className="map-data-grid-row">
                    <Col md={4}>
                        <div className="map-data">
                            <h4>Current event: </h4>
                            <p>{schedulerEventOrigin ? schedulerEventOrigin : manualOriginRef.current.value}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="map-data">
                            <h4 >Next event: </h4>
                            <p>{schedulerEventDest ? schedulerEventDest : manualDestRef.current.value}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="map-data-grid-row">
                    <Col md={4}>
                        <div className="map-data">
                            <h4>Walking Duration: </h4>
                            <p>{dur}</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="map-data">
                            <h4>Walking Distance: </h4>
                            <p>{dis}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    // Called automatically after map loads
    const calcRouteFromSchedule = async (ori, dest) => {

        if (!ori || !dest) {
            return;
        }

        const dirService = new window.google.maps.DirectionsService();
        const res = await dirService.route({
            origin: ori.Location,
            destination: dest.Location,
            travelMode: window.google.maps.TravelMode.WALKING
        });
        setDirRes(res);
        setDis(res.routes[0].legs[0].distance.text);
        setDur(res.routes[0].legs[0].duration.text);
        setSchedulerEventOrigin(ori.Subject);
        setSchedulerEventDest(dest.Subject);
    };

    useEffect(() => {

        setTimeout(() => {
            let currentTime = new Date();
            let i = 0;

            if (!state) {
                return;
            }

            while (i < state.length) {
                // check if event startime is after current time
                if (currentTime < new Date(state[i].StartTime)) {
                    let ori;
                    let dest;

                    // more than one event
                    if (i > 0) {
                        ori = state[i - 1];
                        dest = state[i];
                    }
                    // only one event
                    else {
                        ori = state[i];
                        dest = state[i];
                    }
                    calcRouteFromSchedule(ori, dest);
                    break;
                }
                i += 1;
            }
        }, schedulerEventWaitTimeInMilliSec);
    }, []);

    if (!isLoaded) {
        return (
            <div>Loading...</div>
        );
    }

    // Called when button is clicked
    const calcRouteManually = async () => {

        setSchedulerEventOrigin("");
        setSchedulerEventDest("");

        if (manualOriginRef.current.value === '' || manualDestRef.current.value === '') {
            alert("Please fill in all fields");
            return;
        }

        try {
            const dirService = new window.google.maps.DirectionsService();
            const res = await dirService.route({
                origin: manualOriginRef.current.value,
                destination: manualDestRef.current.value,
                travelMode: window.google.maps.TravelMode.WALKING
            });

            setDirRes(res);
            setDis(res.routes[0].legs[0].distance.text);
            setDur(res.routes[0].legs[0].duration.text);
        }

        catch (err) {
            alert("Location does not exist");
        }
    };

    function Map() {
        return (<GoogleMap zoom={mapZoom} center={center} mapContainerClassName="map-container">
            <MarkerF />
            {dirRes && <DirectionsRenderer directions={dirRes} />}
        </GoogleMap>);
    }


    return (
        <div className="map-page-container">
            <DataGrid />
            <h2>Google Maps</h2>
            <Map />
        </div>
    );

};