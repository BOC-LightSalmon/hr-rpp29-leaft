import React from 'react';
import axios from 'axios';
import RouteForm from './RouteForm';
import Map from './Map';
import RoutesList from './RoutesList';
import './driver.scss';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../../App';

class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: false,
      routes: [],
      selectedRoute: {},
      userId: this.props.userId,
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
    axios.get(`/api/drivers/routes?driver_id=${this.state.userId}`)
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
      return (
        <AuthContext.Consumer >
          {userData => {
           return (
             <div id="driver-container">
              <Navbar />
              <div id="driver-wrapper">
                <Map routes={this.state.routes} selectedRoute={this.state.selectedRoute} />
                <RoutesList routes={this.state.routes} getRoutes={this.getRoutes} driverName={userData.first_name} selectRoute={this.selectRoute} />
                <button onClick={this.showForm} id="make-new-route">Make New Route</button>
              </div>
              {this.state.modal && <RouteForm getRoutes={this.getRoutes} closeForm={this.closeForm} userId={userData.id}/>}
            </div>
           )
          }}
        </AuthContext.Consumer>
      );
    } else {
      return(
        <div>Loading...</div>
      );
    }
  }
}

export default Driver;