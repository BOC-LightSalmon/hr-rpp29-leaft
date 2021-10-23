import React from 'react';

const Driver = function (props) {
  return (
    <div>
      <button onClick={props.driverHandle}>BACK</button>
      <h3>Driver Page</h3>
    </div>
  )
}

export default Driver;