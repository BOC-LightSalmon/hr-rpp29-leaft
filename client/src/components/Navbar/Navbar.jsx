import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { NavBarData } from './navbarData';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiLogoutBoxFill } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import './navbar.scss';
import axios from 'axios';

function Navbar({ isLoggedIn }) {
  const [ sidebar, setSidebar ] = useState(false);
  const userData = useContext(AuthContext);
  
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    
    <div>
      <div className="nav">
        <div id="logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="menu-icon">
            {!sidebar &&
              <FaBars className="nav-icon" onClick={toggleSidebar}/>
            }
            {sidebar &&
              <FaTimes className="nav-icon" onClick={toggleSidebar}/>
            }
        </div>
          <ul className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            {NavBarData.map((item, index) => {
              return (
                <Link to={item.path} className={item.cName}>
                  <li data-testid={`navbar-${item.title}`} key={index} >
                    
                      {item.icon}
                      <span className="nav-link-text">{item.title === 'Balance' ? `${item.title}: $${userData.balance.toFixed(2)}` : item.title}</span>
                  </li>
                </Link>
              )
            })}
            <Link to='/login' className="nav-links" onClick={() => axios.get('/api/logins/logout')}>
              <li className='nav-text'>
                <RiLogoutBoxFill className="navbar-icons"/>
                <span className="nav-link-text">Logout</span>
              </li>
            </Link>
          </ul>
      </div>
    </div>
  )
}

export default Navbar
