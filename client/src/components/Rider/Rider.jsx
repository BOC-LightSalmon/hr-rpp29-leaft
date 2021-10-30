import React from 'react';
import { Link } from 'react-router-dom';

const Rider = function (props) {
  return (
    <div>
      <Link to="/main">
        <button>BACK</button>
      </Link>
      <h3>Rider Page</h3>
    </div>
  )
}

export default Rider;