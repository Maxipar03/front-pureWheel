import React, { useRef, useState } from "react";
import './header.css'
import logo from "../../../public/PureWheelLogo2.png"
import { Link, json } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BurgerMenu from '../Popups/burgerMenu/burgerMenu'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


function header() {
  const [burgerMenu, setBurgerMenu] = useState(false)

  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));

  const burgerMenuFunction = () => {
    if(!burgerMenu)setBurgerMenu(true)
    if(burgerMenu)setBurgerMenu(false)
}
 
  const [open, setOpen] = useState(false)

  const handleLogout = () => {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userLogged');

   window.location.href = '/';
  };


  return (
    <div className="componentHeader">
      <header className="header">
        <div className="divLogo">
          <Link to='/'>
            <img src={logo} className="imageLogo" />
          </Link>
        </div>
        <div className="options">
          <ul className="selectors">
            <li>About Us</li>
            <li>Buy Car</li>
            <li>Sell car</li>
          </ul>
          {userLogged ? (
            <div className="dropdownContainer">
              <div className="userLoggedNameContainer" onClick={() => setOpen(!open)}>
             <FontAwesomeIcon icon={faUser} /> 
             <h3 className="userLoggedName">{userLogged.name}</h3>
             </div>
              {open && (
                <div className="dropdownMenu">
                  <div className="dropdownOptionContainer">
                  <FontAwesomeIcon icon={faUserPen} />  
                  <h3 className="dropdownOption">Profile</h3>
                  </div>   
                  <div className="dropdownOptionContainer" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <h3 className="dropdownOption">logout</h3>
                  </div>
                </div>
              )}
            </div>)
            :
            (
              <ul className="selectorsSession">
                <Link to='/user/loggin' style={{ textDecoration: 'none' }}>
                  <li>LoggIn</li>
                </Link>
                <Link to='/user/register' style={{ textDecoration: 'none' }}>
                  <li>Register</li>
                </Link>
              </ul>
            )
          }

        </div>
        <FontAwesomeIcon onClick={burgerMenuFunction} icon={faBars} className="burgerMenu"/>
    </header>
    <BurgerMenu trigger={burgerMenu} setTrigger={setBurgerMenu}></BurgerMenu>
    </div>
  )
}

export default header