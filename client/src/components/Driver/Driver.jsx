import React from 'react';
import RouteForm from './RouteForm';

const Driver = function (props) {
  return (
    <div>
      <button onClick={props.driverHandle}>BACK</button>
      <h3>Driver Page</h3>
      <RouteForm />
    </div>
  )
}

export default Driver;