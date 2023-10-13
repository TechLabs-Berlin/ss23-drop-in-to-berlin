import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../logo/logo-simple-text-small.svg';

function NavBar() {
  const location = useLocation();

  const refreshPage = () => {
    window.location.reload();
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className='navbar-wrapper'>
      <div className='nav-bar'>
        <Link to={'/'}>
          <img
            src={Logo}
            className='logo'
            onClick={isHomePage ? refreshPage : null}
          />
        </Link>
        <div>
          <Link to={'/about'} className='nav-item'>
            About
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
