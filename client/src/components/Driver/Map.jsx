import React from 'react';
import axios from 'axios';

import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: window.google,
      zoom: 2,
      center: { lat: 50, lng: 30 },
      key: '',
      loaded: false
    };
  }

  componentDidMount() {
    axios.get('/api/key')
     .then(res => {
      this.setState({
        key: res.data,
        loaded: true
      });
     })
     .catch(err => {
      console.log(err);
     });
  }

  // add custom marker
  // import lat and lng from routes list (need to pass state up from routes list) to display on map
  // figure out how to show a route between two start and end points (stretch)

  render() {
    if (this.state.loaded) {
      const style = {
        width: '45vh',
        height: '45vh',
        marginBottom: '30px',
        maxHeight: '45vh',
        maxWidth: '45vh',
        paddingLeft: '2%'
      };

      return(
        <div style={style}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: this.state.key }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
          </GoogleMapReact>
        </div>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}

export default Map;