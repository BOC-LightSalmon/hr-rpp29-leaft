import React from 'react';
import axios from 'axios';
import RouteForm from './RouteForm';
import Map from './Map';
import RoutesList from './RoutesList';
import './driver.scss';
import Navbar from '../Navbar/Navbar';

class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: false,
      routes: [],
      selectedRoute: {},
      driverName: 'testDriverName',
      loaded: false
    };

    this.getRoutes = this.getRoutes.bind(this);
    this.selectRoute = this.selectRoute.bind(this);
    this.showForm = this.showForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentDidMount() {
    this.getRoutes();

    document.addEventListener('click', (e) => {
      if (this.state.modal && !e.target.closest('.driver-modal') && e.target.id !== 'make-new-route') {
        this.closeForm();
      }
    }, false);
  }

  showForm() {
    this.setState({
      modal: true
    });
  }

  closeForm() {
    this.setState({
      modal: false
    });
  }

  selectRoute(route) {
    this.setState({
      selectedRoute: route
    });
  }

  getRoutes() {
    axios.get('/api/drivers/routes')
    .then(res => {
      let data = res.data;

      data.forEach(route => {
        route.pickUpCoords = { lat: Number(route.latPickUp), lng: Number(route.lngPickUp) };
        route.dropOffCoords = { lat: Number(route.latDropOff), lng: Number(route.lngDropOff) };
      });

      data.sort((a, b) => Number(a.departure.replace(':', '')) - Number(b.departure.replace(':', '')));

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
          <Navbar userId={1} handleRedirect={this.props.handleRedirect} />
          {/* <p><i onClick={this.props.driverHandle} className="arrow left"></i></p> */}
          <div id="driver-wrapper">
            <Map routes={this.state.routes} selectedRoute={this.state.selectedRoute} />
            <RoutesList routes={this.state.routes} getRoutes={this.getRoutes} driverName={this.state.driverName} selectRoute={this.selectRoute} />
            <button onClick={this.showForm} id="make-new-route">Make New Route</button>
          </div>
          {this.state.modal && <RouteForm getRoutes={this.getRoutes} closeForm={this.closeForm}/>}
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