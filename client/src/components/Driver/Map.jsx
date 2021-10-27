import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import mapsAPIKey from './mapsAPIKey';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: window.google,
      zoom: 2
    };
  }

  render() {
    const style = {
      width: '50%',
      height: '50%'
    };

    return(
      <Map google={window.google} zoom={this.state.zoom} style={style}>
        <Marker />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: mapsAPIKey
})(MapContainer);