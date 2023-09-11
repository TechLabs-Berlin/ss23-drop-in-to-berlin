import './NavBar.css'
import { Link } from "react-router-dom";
import {IoRestaurant} from "react-icons/io5"

function NavBar () {

  return (
    <div className="nav-bar">
      <Link to={'/'}>
        <IoRestaurant size="2rem" className='logo'/>
      </Link>
      <div>
        <Link to={'/faq'} className="nav-item" >FAQ</Link>
        <Link to={'/contact'} className="nav-item">Contact</Link>
      </div>
    </div>
  )
}

export default NavBar