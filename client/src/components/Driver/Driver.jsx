import React from 'react';
import axios from 'axios';
import RouteForm from './RouteForm';
import Map from './Map';
import RoutesList from './RoutesList';
import './driver.scss';
import Navbar from '../Navbar/Navbar';
import socketClient from "socket.io-client";
import Confirm from './Confirm';
import Cancel from './Cancel';
import { AuthContext } from '../../App';

class Driver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formModal: false,
      routes: [],
      selectedRoute: {},
      userData: {},
      loaded: false,
      confirm: false,
      cancel: false,
      notificationData: null,
      userId: this.props.userId,
    };

    this.getRoutes = this.getRoutes.bind(this);
    this.selectRoute = this.selectRoute.bind(this);
    this.showForm = this.showForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.connectToSocket = this.connectToSocket.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this)
    this.handleCancellation = this.handleCancellation.bind(this)
  }

  componentDidMount() {
    this.connectToSocket();
    this.getRoutes();

    document.addEventListener('click', (e) => {
      if (this.state.modal && !e.target.closest('.driver-modal') && e.target.id !== 'make-new-route') {
        this.closeForm();
      }
    }, false);
  }

  connectToSocket() {
    const socket = socketClient(`http://18.188.220.4/`)
    const driverId = this.props.userId
    socket.on('confirmRoute', (data) => {
      if (data.route.driver_id === driverId) {
        this.setState({
          notificationData: data,
          confirm: true
        })
      }
    })

    socket.on('cancelRoute', (data) => {
      if (data.driverId === driverId) {
        this.setState({
          notificationData: data,
          cancel: true
        })
      }
    })
  }

  handleConfirmation() {
    this.setState({
      confirm: !this.state.confirm
    })
  }

  handleCancellation() {
    this.setState({
      cancel: !this.state.cancel
    })
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
          route.dateTime = new Date(`${route.date} ${route.departure}`).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short'});
        });

        data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        this.setState({
          routes: data,
          loaded: true
        });
      })
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
                {this.state.modal && <RouteForm getRoutes={this.getRoutes} closeForm={this.closeForm} userId={userData.id} />}
                {this.state.confirm && <Confirm
                  handleConfirmation={this.handleConfirmation}
                  notificationData={this.state.notificationData}
                  userData={userData}
                />}
                {this.state.cancel && <Cancel
                  handleCancellation={this.handleCancellation}
                  notificationData={this.state.notificationData}
                  userData={userData}
                />}
              </div>
            )
          }
          }
        </AuthContext.Consumer >
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default Driver;
