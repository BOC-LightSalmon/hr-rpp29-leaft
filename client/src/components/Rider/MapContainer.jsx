import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
// import Geocode from "react-geocode";
import { API_KEY } from '../Driver/mapsAPIKey';

// Geocode.setApiKey(API_KEY);
// Geocode.setRegion('us');
const Marker = ({text}) => <div>{text}</div>;
const MapContainer = (props) => {
    // const [riderLatLng, setRiderLatLng] = useState({});
    // const [pickupsLatLng, setPickupsLatLng] = useState([]); // array of lats and lngs of all the nearby pickups like [{lat: , lng: }, {lat: , lng: }]


    // async function getCoordinates(address) {
    //     const response = await Geocode.fromAddress(address);
    //     const {lat, lng} = response.results[0].geometry.location;
    //     const dataObj = {
    //       lat: lat,
    //       lng: lng,
    //     };
    //     console.log('🦒', dataObj)
    //     return dataObj;
    // }
      
    
    // console.log('🍍', props.nearbyRides)
    useEffect(() => {
        // getCoordinates(props.riderLocation).then(val => 
        //     setRiderLatLng(val));
            
            // add promise.all to handle a list of addresses

        // const nearbyRides = [{start: 'muirwood park', zip: '94588'}, {start: 'moller park', zip: '94588'}];
        // const mapLoop = async _ => {
        //     const promises = props.nearbyRides.map(async nearbyRide => {
        //         const coordinates = await getCoordinates(nearbyRide);
        //         console.log('🥗', nearbyRide, coordinates)
        //         return coordinates;
        //     });
            
        //     const arrayofcoordinates = await Promise.all(promises);
        //     return arrayofcoordinates;
        // }
        
        // mapLoop().then((res) => {
        //     let array = JSON.parse(JSON.stringify(res));
        //     console.log('🥦', res)
        //     setPickupsLatLng(array);
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    }, []);
    
    
    // console.log('🌺', pickupsLatLng);
    // console.log('🦥', riderLatLng)
    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            >
                {console.log('🍩', props.riderLocation)}
                <Marker lat={props.riderLocation.lat} lng={props.riderLocation.lng} text={'🍁'} />
                {props.nearbyRides.map((nearbyRide, key) => console.log('🍺', nearbyRide) || <Marker lat={nearbyRide.lat} lng={nearbyRide.lng} text={'🌳'} key={key} />)}
            </GoogleMapReact>
        </div>
    );
}

export default MapContainer;

// on the first page we will need all the pickup locations in a given zipcode