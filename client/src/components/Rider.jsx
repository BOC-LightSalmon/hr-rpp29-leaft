import React from 'react';

const Rider = function (props) {
  return (
    <div>
      <button onClick={props.riderHandle}>BACK</button>
      <h3>Rider Page</h3>
    </div>
  )
}

export default Rider;