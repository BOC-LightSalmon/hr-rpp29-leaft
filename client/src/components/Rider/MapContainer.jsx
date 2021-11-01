import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

Geocode.setApiKey('AIzaSyAxt1bss46Tsxo2ko683AGyx4U2sauBX4o');
Geocode.setRegion('us');

const MapContainer = (props) => {
    const [riderLatLng, setRiderLatLng] = useState({});
    const [pickupsLatLng, setPickupsLatLng] = useState([]); // array of lats and lngs of all the nearby pickups like [{lat: , lng: }, {lat: , lng: }]

    //console.log('🦔', props.nearbyRides);
    useEffect(() => {
        Geocode.fromAddress(props.riderLocation).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setRiderLatLng({lat: lat, lng: lng});
            },
            (error) => {
                console.error(error);
            }
        );
        //console.log('🦥', riderLatLng)
        let array = [];
        props.nearbyRides.forEach((nearbyRide) => {
                Geocode.fromAddress(nearbyRide.start).then((response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    array.push({lat: lat, lng: lng});
                    setPickupsLatLng(array);
                },
                (error) => {
                    console.error(error);
                }
            );
        });
        //console.log('🌺', pickupsLatLng);
    }, []);
    
    const Marker = ({text}) => <div>{text}</div>
    
    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAxt1bss46Tsxo2ko683AGyx4U2sauBX4o' }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            >
                <Marker lat={riderLatLng.lat} lng={riderLatLng.lng} text='🍁' />
                {pickupsLatLng.map((pickupLatLng) => <Marker lat={pickupLatLng.lat} lng={pickupLatLng.lng} text='🌳' />)}
            </GoogleMapReact>
        </div>
    );
}

export default MapContainer;

// on the first page we will need all the pickup locations in a given zipcode