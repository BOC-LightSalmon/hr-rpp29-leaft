import React from 'react';
import Navbar from './Navbar/Navbar';
import car from '../assets/cars.png';

import './main.scss';
import { NavLink } from 'react-router-dom';


const Main = () => {

  return (
    <div>
      <Navbar />
      <div id="car-image">
        <img src={car} alt="cars in town" />
      </div>
      <div id="main-page-buttons">
      <NavLink className="main-page-button" to="/driver">Driver</NavLink>
      <NavLink className="main-page-button" to="/rider">Rider</NavLink>
      </div>
    </div>
  )
}

export default Main;