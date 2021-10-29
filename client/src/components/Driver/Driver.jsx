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
      driverName: 'testDriverName'
    };

    this.getRoutes = this.getRoutes.bind(this);
  }

  showForm() {
    console.log('submit route form should pop up');
  }

  getRoutes() {
    console.log('entered get routes');

    axios.get('/api/drivers/routes')
    .then(res => {
      console.log(res.data);

      this.setState({
        routes: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <div id="driver-container">
        <button onClick={this.props.driverHandle}>BACK</button>
        <div id="driver-wrapper">
          <Map routes={this.state.routes}/>
          <RoutesList routes={this.state.routes} getRoutes={this.getRoutes} driverName={this.state.driverName}/>
          <RouteForm getRoutes={this.getRoutes}/>
          <button onClick={this.showForm} id="make-new-route">Make New Route</button>
        </div>
      </div>
    );
  }
}

export default Driver;