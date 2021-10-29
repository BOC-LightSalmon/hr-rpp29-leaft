import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: window.google,
      zoom: 11,
      center: this.props.routes.length !== 0 ? this.props.routes[0].pickUpCoords : { lat: 40.7580, lng: -73.9855 },
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

  render() {
    const style = {
      width: '45vh',
      height: '45vh',
      marginBottom: '30px',
      maxHeight: '45vh',
      maxWidth: '45vh',
      paddingLeft: '2%'
    };

    const Marker = ({ text, lat, lng }) => <div>{text}</div>;
    const selectedRoute = this.props.selectedRoute;

    if (this.state.loaded && selectedRoute.departure !== undefined) {
      return(
        <div style={style}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: this.state.key }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
               <Marker lat={selectedRoute.pickUpCoords.lat} lng={selectedRoute.pickUpCoords.lng} text='✅' id="map-start" />
               <Marker lat={selectedRoute.dropOffCoords.lat} lng={selectedRoute.dropOffCoords.lng} text='🛑' id="map-end" />
          </GoogleMapReact>
        </div>
      );
    } else if (this.state.loaded && !selectedRoute.departure) {
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
      return(
        <div>Loading...</div>
      );
    }
  }
}

export default Map;