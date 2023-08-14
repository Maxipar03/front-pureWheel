import React, {useState} from "react";
import './header.css'
import logo from "../../../public/PureWheelLogo2.png"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BurgerMenu from '../Popups/burgerMenu/burgerMenu'
function header() {
  const [burgerMenu, setBurgerMenu] = useState(false)

  const userLogged = sessionStorage.getItem('userLogged'); 

  const burgerMenuFunction = () => {
    if(!burgerMenu)setBurgerMenu(true)
    if(burgerMenu)setBurgerMenu(false)
}

return (
  <div className="componentHeader">
     <header className="header">
     <div className="divLogo">
     <Link to='/'>
        <img src={logo} className="imageLogo"/>
   </Link>
     </div>
     <div className="options">
     <ul className="selectors">
        <li>About Us</li>
        <li>Buy Car</li>
        <li>Sell car</li>
     </ul>
      { userLogged ? null : 
     <ul className="selectorsSession">
     <Link to='/user/loggin' style={{ textDecoration: 'none' }}>
        <li>LoggIn</li>
      </Link>
      <Link to='/user/register' style={{ textDecoration: 'none' }}>
        <li>Register</li>
      </Link>
     </ul>
     }
     </div>
     <FontAwesomeIcon onClick={burgerMenuFunction} icon={faBars} className="burgerMenu"/>
    </header>
    <BurgerMenu trigger={burgerMenu} setTrigger={setBurgerMenu}></BurgerMenu>
  </div>
  )
}

export default header