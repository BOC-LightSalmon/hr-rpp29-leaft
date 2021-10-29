import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';

const Rider = (props) => {
  const [center, setCenter] = useState({lat: 37.658428, lng: -121.876999});
  const [zoom, setZoom] = useState(11);
  const [riderLocation, setRiderLocation] = useState(94588);
  const [nearbyRides, setNearbyRides] = useState([]); 
  // ^ this will be an array with all the columns (or not) of the Routes table, it will have all the info including pick up and dropoff locations, times where the riderLocation is equal to Ride.zip

  // will need useEffect to fetch data from database and change state accordingly
  useEffect(() => {
    setNearbyRides([{start: 'muirwood park', zip: '94588'}, {start: 'dublin CA', zip: '94588'}]);
  }, []);

  return (
    <div className="page">
      <button onClick={props.riderHandle}>BACK</button>
      <MapContainer nearbyRides={nearbyRides} riderLocation={riderLocation} center={center} zoom={zoom} />
    </div>
  );
};

export default Rider;