import React from 'react';
import mapsAPIKey from './mapsAPIKey';

import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: window.google,
      zoom: 2,
      center: { lat: 50, lng: 30}
    };
  }

  render() {
    const style = {
      width: '100%',
      height: '50vh'
    };

    return(
      <div style={style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapsAPIKey }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;