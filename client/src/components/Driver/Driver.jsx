import React from 'react';

import RouteForm from './RouteForm';
import MapContainer from './Map';
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
        <MapContainer />
        <RoutesList />
        <RouteForm />
        <button onClick={this.showForm}>Make New Route</button>
      </div>
    );
  }
}

export default Driver;