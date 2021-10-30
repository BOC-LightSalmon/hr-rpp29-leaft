import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import axios from 'axios';
import './rider.css';

const Rider = (props) => {
  // eslint-disable-next-line
  const [riderLocation, setRiderLocation] = useState({lat: 37.70, lng: -121.876999});
  const [nearbyRides, setNearbyRides] = useState([]); 
  // ^ this will be an array with all the columns (or not) of the Routes table, it will have all the info including pick up and dropoff locations, times where the riderLocation is equal to Ride.zip

  // will need useEffect to fetch data from database and change state accordingly
  useEffect(() => {
    axios.get('/api/riders/rides')
      .then(res => {
        console.log('🦨', res.data)
        setNearbyRides(res.data);
        console.log(nearbyRides)
      })
      .catch(err => {
        console.log('err in back to client', err);
      })
      // eslint-disable-next-line
  }, []);

  return (
    <div className="page">
      <button onClick={props.riderHandle}>BACK</button>
      <MapContainer nearbyRides={nearbyRides} riderLocation={riderLocation} />
    </div>
  );
};

export default Rider;