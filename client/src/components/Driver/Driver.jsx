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

  render() {
    return(
      <div>
        <button onClick={this.props.driverHandle}>BACK</button>
        <h3>Driver Page</h3>
        <Map />
        <RoutesList />
        <RouteForm />
      </div>
    );
  }
}

export default Driver;