import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

Geocode.setApiKey('AIzaSyAxt1bss46Tsxo2ko683AGyx4U2sauBX4o');
Geocode.setRegion('us');

const MapContainer = (props) => {
    const [riderLatLng, setRiderLatLng] = useState({lat: 37.658428, lng: -121.876999});

    useEffect(() => {
        Geocode.fromAddress(props.riderLocation).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setRiderLatLng({lat: lat, lng: lng});
                console.log('🌻', riderLatLng);
            },
            (error) => {
                console.error(error);
            }
        );
    });
    
    const Marker = ({text}) => <div>{text}</div>
    
    return (
        <div style={{ height: '65vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAxt1bss46Tsxo2ko683AGyx4U2sauBX4o' }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            >
                <Marker lat={riderLatLng.lat} lng={riderLatLng.lng} text="G" />
            </GoogleMapReact>
        </div>
    );
}

export default MapContainer;