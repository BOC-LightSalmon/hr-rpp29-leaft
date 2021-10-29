import React from 'react';
// import mapsAPIKey from './mapsAPIKey'; // <-- uncomment this after adding API key + file

import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: window.google,
      zoom: 2,
      center: { lat: 50, lng: 30 }
    };
  }

  // add custom marker
  // import start and end points from routes list (need to pass state up from routes list) to display on map
  // figure out how to show a route between two start and end points

  render() {
    const style = {
      width: '50vh',
      height: '50vh',
      marginBottom: '30px'
    };

    return(
      <div style={style}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: mapsAPIKey }} // <-- uncomment this after adding API key + file
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;