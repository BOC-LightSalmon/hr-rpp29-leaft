import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { NavBarData } from './navbarData';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import './navbar.scss';
import axios from 'axios';

function Navbar() {
  const [ sidebar, setSidebar ] = useState(false);
  const userData = useContext(AuthContext);
  
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaBars className="nav-icon" onClick={toggleSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose className="nav-icon" onClick={toggleSidebar}/>
            </Link>
          </li>
          {NavBarData.map((item, index) => {
            return (
              <li data-testid={`navbar-${item.title}`} key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title === 'Balance' ? `${item.title}: $${userData.balance.toFixed(2)}` : item.title}</span>
                </Link>
              </li>
            )
          })}
          <li className='nav-text'><Link to='/login' onClick={() => axios.get('/api/logins/logout').then((res) => {
            console.log(res);
          })}><span>Logout</span></Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
