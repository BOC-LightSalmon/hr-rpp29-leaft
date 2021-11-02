import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const Marker = ({text, onMarkerClick}) => <div onClick={onMarkerClick}>{text}</div>;
const MapContainer = (props) => {
    const [key, setKey] = useState('');
    const [loaded, setLoaded] = useState(false);
    // eslint-disable-next-line
    const [zoom, setZoom] = useState(15);
    // eslint-disable-next-line
    const [center, setCenter] = useState({lat: 37.658428, lng: -121.876999});
    // eslint-disable-next-line
    const [markerClicked, setMarkerClicked] = useState(false);
    const [whichMarkerClicked, setWhichMarkerClicked] = useState(null);
         
    useEffect(() => {
        axios.get('api/key')
            .then(res => {
                setKey(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log ('error in axios get api key', err);
            });
    }, []);

    const handleGoogleMapApi = (map, maps) => {
        if (whichMarkerClicked !== null) {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            
            const origin = {lat: parseFloat(props.nearbyRides[whichMarkerClicked].latPickUp), lng: parseFloat(props.nearbyRides[whichMarkerClicked].lngPickUp)};
            const destination = {lat: parseFloat(props.nearbyRides[whichMarkerClicked].latDropOff), lng: parseFloat(props.nearbyRides[whichMarkerClicked].lngDropOff)};
    
            directionsService.route({
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.log('error', result);
                }
            });   
        }
    };
    
    const handleMarkerClick = (key) => {
        setMarkerClicked(!markerClicked);
        setWhichMarkerClicked(key);
    }

    return (
        loaded ? 
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: key }}
            defaultCenter={center}
            defaultZoom={zoom} yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleGoogleMapApi(map, maps)} key={markerClicked}
            >
                <Marker lat={props.riderLocation.lat} lng={props.riderLocation.lng} text={'🍀'} />

                {props.nearbyRides.map((nearbyRide, key) => <Marker lat={nearbyRide.latPickUp} lng={nearbyRide.lngPickUp} text={'🍃'} key={key} onMarkerClick={() => handleMarkerClick(key)} />)}

                {props.nearbyRides.map((nearbyRide, key) => <Marker lat={nearbyRide.latDropOff} lng={nearbyRide.lngDropOff} text={'🍂'} key={key} />)}
            </GoogleMapReact>
        </div> : <div>Loading...</div>
    );
}

export default MapContainer;