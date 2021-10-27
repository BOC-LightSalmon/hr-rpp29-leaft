import React from 'react';
import GoogleMap from 'google-map-react';

const MapContainer = (props) => {
    return (
        <div style={{ height: '65vh', width: '100%' }}>
        <GoogleMap
            bootstrapURLKeys={{ key: 'AIzaSyAxt1bss46Tsxo2ko683AGyx4U2sauBX4o' }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
        >
        </GoogleMap>
        </div>
    );
}

export default MapContainer;