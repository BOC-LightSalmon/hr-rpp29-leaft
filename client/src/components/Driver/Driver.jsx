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
      notificationData: null
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
    this.connectToSocket()
    this.getRoutes();

    document.addEventListener('click', (e) => {
      if (this.state.modal && !e.target.closest('.driver-modal') && e.target.id !== 'make-new-route') {
        this.closeForm();
      }
    }, false);
  }

  connectToSocket() {
    const socket = socketClient('http://localhost:5000')
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
      return (
        <AuthContext.Consumer >
          {userData => { // userData is App state
            return (
              <div id="driver-container">
                {/*
              *****************************************************

              You can access anything from App state like this:

              <div>{userData.id}</div>

              *****************************************************
              */}

                <Navbar />
                <div id="driver-wrapper">
                  <Map routes={this.state.routes} selectedRoute={this.state.selectedRoute} />
                  <RoutesList routes={this.state.routes} getRoutes={this.getRoutes} driverName={this.state.driverName} selectRoute={this.selectRoute} />
                  <button onClick={this.showForm} id="make-new-route">Make New Route</button>
                </div>
                {this.state.modal && <RouteForm
                  getRoutes={this.getRoutes}
                  closeForm={this.closeForm}
                  userData={userData}
                />}
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
          }}
        </AuthContext.Consumer>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

//Driver.contextType = AuthContext;
export default Driver;