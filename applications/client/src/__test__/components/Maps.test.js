import {cleanup, fireEvent, render} from '@testing-library/react';
import { Map } from '../../components/Map';
import { initialize, Marker, mockInstances } from "@googlemaps/jest-mocks";
import React, { useRef } from 'react';

beforeEach(() => {
    initialize();
});
      
test("Google Maps API mock", () => {
    const map = new google.maps.Map(null);
    const markerOne = new google.maps.Marker();
    const markerTwo = new google.maps.Marker();
      
    markerOne.setMap(map);
    markerTwo.setLabel("marker");
      
    const mapMocks = mockInstances.get(Map);
    const markerMocks = mockInstances.get(Marker);
      
    expect(mapMocks).toHaveLength(0);
    expect(markerMocks).toHaveLength(2);
    expect(markerMocks[0].setMap).toHaveBeenCalledTimes(1);
    expect(markerMocks[1].setLabel).toHaveBeenCalledWith("marker");
});
      
beforeAll(() => {
    initialize();
});
        
// Clear all mocks
beforeEach(() => {
    mockInstances.clearAll();
});
      
// Clear specific mocks
 beforeEach(() => {
    mockInstances.clear(Map, Marker);
});