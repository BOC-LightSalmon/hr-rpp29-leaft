import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import { API_KEY } from './mapsAPIKey';

Geocode.setApiKey(API_KEY);
Geocode.setRegion('us');

const MapContainer = (props) => {
    const [riderLatLng, setRiderLatLng] = useState({});
    const [pickupsLatLng, setPickupsLatLng] = useState([]); // array of lats and lngs of all the nearby pickups like [{lat: , lng: }, {lat: , lng: }]


    async function getCoordinates(address) {
        const response = await Geocode.fromAddress(address);
        const {lat, lng} = response.results[0].geometry.location;
        const dataObj = {
          lat: lat,
          lng: lng,
        };
        console.log('🦒', dataObj)
        return dataObj;
    }
      
    
    useEffect(() => {
        getCoordinates(props.riderLocation).then(val => 
           setRiderLatLng(val));

        // add promise.all to handle a list of addresses
    }, []);

    // console.log('🌺', pickupsLatLng);
    console.log('🦥', riderLatLng)
    const Marker = ({text}) => <div>{text}</div>
    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            >
                <Marker lat={riderLatLng.lat} lng={riderLatLng.lng} text='🍁' />
                {pickupsLatLng.map((pickupLatLng, key) => <Marker lat={pickupLatLng.lat} lng={pickupLatLng.lng} text='🌳' key={key} />)}
            </GoogleMapReact>
        </div>
    );
}

export default MapContainer;

// on the first page we will need all the pickup locations in a given zipcode