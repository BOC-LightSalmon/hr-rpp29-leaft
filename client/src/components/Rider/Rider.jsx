import React, { useState } from 'react';
import MapContainer from './MapContainer';

const Rider = (props) => {
  const [center, setCenter] = useState({lat: 37.658428, lng: -121.876999});
  const [zoom, setZoom] = useState(11);
  // pickup locations, destinations, user's location (or maybe not) 

  return (
    <div>
      <button onClick={props.riderHandle}>BACK</button>
      <MapContainer center={center} zoom={zoom} />
    </div>
  );
};

export default Rider;