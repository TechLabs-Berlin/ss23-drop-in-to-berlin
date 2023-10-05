import './NavBar.css'
import { Link, useLocation } from "react-router-dom";
import Logo from '../../logo/logo-simple-text-small.svg'

function NavBar () {
  const location = useLocation();



  return (
    <div className="nav-bar">
      <Link to={'/'}>
        <img src={Logo} className='logo' />
      </Link>
      <div>
        <Link to={'/about'} className="nav-item">About</Link>
      </div>
    </div>
  )
}

export default NavBar;