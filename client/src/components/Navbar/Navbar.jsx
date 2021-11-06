import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import { NavBarData } from './navbarData';
import BalanceAPIutils from '../Balance/BalanceAPIutils';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import './navbar.scss';
import axios from 'axios';

function Navbar(props) {
  const [ sidebar, setSidebar] = useState(false);
  const [ currentBalance, setCurrentBalance ] = useState('');

  const userData = useContext(AuthContext);

  const getUserBalance = async () => {
    const { data } = await BalanceAPIutils.getBalance(userData.id)
    setCurrentBalance(data);
  }

  useEffect(() => {
    getUserBalance();
  }, [])

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
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title === 'Balance' ? `${item.title}: $${currentBalance}` : item.title}</span>
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
