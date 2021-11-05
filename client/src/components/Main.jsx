import React from 'react';
import Navbar from './Navbar/Navbar';
// import Driver from './Driver/Driver.jsx';
// import Rider from './Rider/Rider';

import './main.scss';
import { NavLink } from 'react-router-dom';


const Main = () => {

  return (
    <div>
      <Navbar />
      <div id="main-page-buttons">
      <NavLink className="main-page-button" to="/driver">Driver</NavLink>
      <NavLink className="main-page-button" to="/rider">Rider</NavLink>
      </div>
    </div>
  )
}

export default Main;