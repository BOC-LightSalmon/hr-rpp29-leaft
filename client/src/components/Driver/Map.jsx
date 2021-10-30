import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 11,
      center: this.props.selectedRoute.departure !== undefined ? this.props.selectedRoute.pickUpCoords : { lat: 40.7580, lng: -73.9855 },
      key: '',
      loaded: false,
      reRender: true
    };

    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    document.getElementById('routes-list').addEventListener('click', (e) => {
      const parentNode = e.target.parentNode.parentNode.parentNode;

      if (parentNode.getAttribute('role') === 'table') {
        this.reRender();
      }
    }, false);

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

  reRender() {
    this.setState({
      reRender: !this.state.reRender
    });
  }

  render() {
    const style = {
      width: '100vw',
      height: '45vh',
      marginBottom: '30px',
      marginTop: '-17px'
    };

    const selectedRoute = this.props.selectedRoute;

    const apiIsLoaded = (map, maps) => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      const origin = selectedRoute.pickUpCoords;
      const destination = selectedRoute.dropOffCoords;

      directionsService.route({
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.log('error', result);
            }
        }
      );
    };

    if (this.state.loaded && selectedRoute.departure !== undefined) {
      return(
        <div style={style} >
          <GoogleMapReact
            bootstrapURLKeys={{ key: this.state.key }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            key={this.state.reRender}
          >
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