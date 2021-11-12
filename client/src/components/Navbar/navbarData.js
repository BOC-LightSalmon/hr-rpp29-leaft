import { AiFillHome } from 'react-icons/ai';
import { AiFillCar } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaHandHoldingUsd } from 'react-icons/fa';

export const NavBarData = [
  {
    title: 'Home',
    path: '/',
    cName: 'nav-links',
    icon: <AiFillHome className="navbar-icons"/>
  },
  {
    title: 'Driver',
    path: '/driver',
    cName: 'nav-links',
    icon: <AiFillCar className="navbar-icons"/>
  },
  {
    title: 'Rider',
    path: '/rider',
    cName: 'nav-links',
    icon: <BsFillPersonPlusFill className="navbar-icons"/>
  },
  {
    title: 'Balance',
    path: '/balance-update',
    cName: 'nav-links',
    icon: <AiFillDollarCircle className="navbar-icons"/>
  },
  {
    title: 'Tip Driver',
    path: '/balance-transfer',
    cName: 'nav-links',
    icon: <FaHandHoldingUsd className="navbar-icons"/>
  }
]