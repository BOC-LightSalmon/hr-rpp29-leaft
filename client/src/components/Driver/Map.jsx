import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      google: window.google,
      zoom: 11,
      center: this.props.routes[0].pickUpCoords,
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
    if (this.state.loaded) {
      const style = {
        width: '45vh',
        height: '45vh',
        marginBottom: '30px',
        maxHeight: '45vh',
        maxWidth: '45vh',
        paddingLeft: '2%'
      };

      const Marker = ({ text, lat, lng }) => <div>{text}</div>;

      return(
        <div style={style}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: this.state.key }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
             <Marker lat={this.props.routes[0].pickUpCoords.lat} lng={this.props.routes[0].pickUpCoords.lng} text='✅' id="map-start" />
             <Marker lat={this.props.routes[0].dropOffCoords.lat} lng={this.props.routes[0].dropOffCoords.lng} text='🛑' id="map-end" />
          </GoogleMapReact>
        </div>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}

export default Map;