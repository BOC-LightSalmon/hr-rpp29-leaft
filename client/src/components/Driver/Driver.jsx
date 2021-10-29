import React from 'react';
import axios from 'axios';
import RouteForm from './RouteForm';
import Map from './Map';
import RoutesList from './RoutesList';
import './driver.css';

class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // logic for showing/hiding various forms/notifications
      routes: [],
      selectedRoute: {},
      driverName: 'testDriverName',
      loaded: false
    };

    this.getRoutes = this.getRoutes.bind(this);
    this.selectRoute = this.selectRoute.bind(this);
  }

  componentDidMount() {
    this.getRoutes();
  }

  showForm() {
    console.log('submit route form should pop up');
    // logic to show submit route form
  }

  selectRoute(e) {
    console.log('select route');
  }

  getRoutes() {
    axios.get('/api/drivers/routes')
    .then(res => {
      const data = res.data;

      data.forEach(route => {
        route.pickUpCoords = { lat: Number(route.latPickUp), lng: Number(route.lngPickUp) };
        route.dropOffCoords = { lat: Number(route.latDropOff), lng: Number(route.lngDropOff) };
      });

      console.log(data);

      this.setState({
        routes: data,
        loaded: true
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    if (this.state.loaded) {
      return(
        <div id="driver-container">
          <button onClick={this.props.driverHandle}>BACK</button>
          <div id="driver-wrapper">
            <Map routes={this.state.routes} />
            <RoutesList routes={this.state.routes} getRoutes={this.getRoutes} driverName={this.state.driverName} />
            <RouteForm getRoutes={this.getRoutes}/>
            <button onClick={this.showForm} id="make-new-route">Make New Route</button>
          </div>
        </div>
      );
    } else {
      return(
        <div>Loading...</div>
      );
    }
  }
}

export default Driver;