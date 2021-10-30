import React from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';

const Signup = function () {

  return (
      <div>
        <Link to="/">
          <button>BACK</button>
        </Link>
        <h3>Sign up Page</h3>
      </div>
  )
}

export default Signup;