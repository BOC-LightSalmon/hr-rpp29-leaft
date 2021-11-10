import { AiFillHome } from 'react-icons/ai';
import { AiFillCar } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaHandHoldingUsd } from 'react-icons/fa';

export const NavBarData = [
  {
    title: 'Home',
    path: '/',
    cName: 'nav-text',
    icon: <AiFillHome />
  },
  {
    title: 'Driver',
    path: '/driver',
    cName: 'nav-text',
    icon: <AiFillCar />
  },
  {
    title: 'Rider',
    path: '/rider',
    cName: 'nav-text',
    icon: <BsFillPersonPlusFill />
  },
  {
    title: 'Balance',
    path: '/balance-update',
    cName: 'nav-text',
    icon: <AiFillDollarCircle />
  },
  {
    title: 'Tip Driver',
    path: '/balance-transfer',
    cName: 'nav-text',
    icon: <FaHandHoldingUsd />
  }
]