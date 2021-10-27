import React from 'react';

import RouteForm from './RouteForm';
import Map from './Map';
import RoutesList from './RoutesList';

class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  showForm() {
    console.log('submit route form should pop up');
  }

  render() {
    return(
      <div>
        <button onClick={this.props.driverHandle}>BACK</button>
        <h3>Driver Page</h3>
        <div id="driver-wrapper">
          <Map />
          <RoutesList />
          <RouteForm />
          <button onClick={this.showForm} id="make-new-route">Make New Route</button>
        </div>
      </div>
    );
  }
}

export default Driver;