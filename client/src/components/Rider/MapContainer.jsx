import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './MapContainer.scss';
import { StartMarker, EndMarker, RiderLocation } from './markers';
import mapStyles from '../../mapStyles';

const MapContainer = (props) => {
    const [key, setKey] = useState('');
    const [loaded, setLoaded] = useState(false);
    // eslint-disable-next-line
    const [zoom, setZoom] = useState(15);
    // eslint-disable-next-line
    const [center, setCenter] = useState({ lat: 40.7580, lng: -73.9855 });

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
        if ((props.markerClicked && props.whichMarkerClicked !== null) || props.rideConfirmed) {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: {
                strokeColor: 'green',
                strokeWeight: 5
            }});

            directionsRenderer.setMap(map);

            const origin = {lat: parseFloat((props.nearbyRides[props.whichMarkerClicked] ? props.nearbyRides[props.whichMarkerClicked] : props.confirmedRide).latPickUp), lng: parseFloat((props.nearbyRides[props.whichMarkerClicked] ? props.nearbyRides[props.whichMarkerClicked] : props.confirmedRide).lngPickUp)};
            const destination = {lat: parseFloat((props.nearbyRides[props.whichMarkerClicked] ? props.nearbyRides[props.whichMarkerClicked] : props.confirmedRide).latDropOff), lng: parseFloat((props.nearbyRides[props.whichMarkerClicked] ? props.nearbyRides[props.whichMarkerClicked] : props.confirmedRide).lngDropOff)};
            console.log('🫀', origin, destination);
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

    return (
        loaded ?
        <div id="MapContainer">
            <GoogleMapReact
            scrollwheel={false}
            options={{styles: mapStyles}}
            bootstrapURLKeys={{ key: key }}
            defaultCenter={center}
            defaultZoom={zoom} yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleGoogleMapApi(map, maps)} key={props.reRender}
            >
                
                <RiderLocation lat={props.riderLocation.lat} lng={props.riderLocation.lng} />

                
                {props.nearbyRides.map((nearbyRide, key) => <StartMarker lat={nearbyRide.latPickUp} lng={nearbyRide.lngPickUp} key={key} onClick={() => props.handleMarkerClick(key)} />)}
                
                {((props.markerClicked && props.whichMarkerClicked !== null) || props.rideConfirmed) ? <EndMarker lat={(props.nearbyRides[props.whichMarkerClicked] ? props.nearbyRides[props.whichMarkerClicked] : props.confirmedRide).latDropOff} lng={(props.nearbyRides[props.whichMarkerClicked] ? props.nearbyRides[props.whichMarkerClicked] : props.confirmedRide).lngDropOff} /> : null}

            </GoogleMapReact>
        </div> : <div>Loading...</div>
    );
}

export default MapContainer;