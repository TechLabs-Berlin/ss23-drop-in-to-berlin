import './NavBar.css'
import { Link } from "react-router-dom";
import Logo from '../../logo/logo-simple-text-small.svg'

function NavBar () {

  return (
    <div className="nav-bar">
      <Link to={'/'}>
        <img src={Logo} className='logo' />
      </Link>
      <div>
        <Link to={'/faq'} className="nav-item" >FAQ</Link>
        <Link to={'/contact'} className="nav-item">Contact</Link>
      </div>
    </div>
  )
}

export default NavBar