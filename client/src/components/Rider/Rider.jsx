import React, { useState } from 'react';
import MapContainer from './MapContainer';

const Rider = (props) => {
  const [center, setCenter] = useState({lat: 37.658428, lng: -121.876999});
  const [zoom, setZoom] = useState(11);
  const [riderLocation, setRiderLocation] = useState(94588);
  // more state examples: pickup locations, destinations, user's location

  return (
    <div>
      <button onClick={props.riderHandle}>BACK</button>
      <MapContainer riderLocation={riderLocation} center={center} zoom={zoom} />
    </div>
  );
};

export default Rider;