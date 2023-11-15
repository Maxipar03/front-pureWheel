import React, { useEffect, useState } from 'react';
import './header.css'
import logo from "../../public/LogoPureWheelPNG3.png"
import usuario from "../../public/usuario.png"
import { Link, json } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BurgerMenu from '../Popups/burgerMenu/burgerMenu'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


function header({ nameClass }) {
  const [burgerMenu, setBurgerMenu] = useState(false)

  const [scrolling, setScrolling] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);


  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
  

  const burgerMenuFunction = () => {
    if (!burgerMenu) setBurgerMenu(true)
    if (burgerMenu) setBurgerMenu(false)
  }

  const [open, setOpen] = useState(false)

  const handleLogout = () => {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userLogged');

    window.location.href = '/';
  };

  const handleMouseEnter = (option) => {
    setSelectedOption(option);
  };

  const handleMouseLeave = () => {
    setSelectedOption(null);
  };


  return (
    <div className="componentHeader">
      <header className={scrolling ? 'headerScrolling' : nameClass}>
        <div className={scrolling ? 'optionScrolling' :'options'}>
          <ul className="selectors">
            <Link to='/products/all' style={{ textDecoration: 'none' }}>
            <div
              className={`header-option ${selectedOption === "buyCar" ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter("buyCar")}
              onMouseLeave={handleMouseLeave}
            >
              <li>Buy Car</li>
              <div
                className={`underline ${selectedOption === "buyCar" ? 'visible' : ''}`}
              ></div>
              </div>
              
            </Link>
            <Link to='/products/sellCar' style={{ textDecoration: 'none' }}>
            <div
              className={`header-option ${selectedOption === "sellCar" ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter("sellCar")}
              onMouseLeave={handleMouseLeave}
            >
              <li>Sell car</li>
              <div
                className={`underline ${selectedOption === "sellCar" ? 'visible' : ''}`}
              ></div>
            </div>
            </Link>
          </ul>
          <div className="divLogo">
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 className='titleHeader'>pure<b>wheel</b></h1>
            <img src={logo} className='imageLogo' />
          </Link>
        </div>
          {userLogged ? (
            <div className="dropdownContainer">
              <div className="userLoggedNameContainer" onClick={() => setOpen(!open)}>
                <img src={usuario} className='imageUserHeader' />
                <h3 className="userLoggedName">{userLogged.name}</h3>
              </div>
              {open && (
                <div className="dropdownMenu">
                  <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <div className="dropdownOptionContainer">
                    <FontAwesomeIcon icon={faUserPen} />
                    <h3 className="dropdownOption">Profile</h3>
                  </div>
                  </Link>
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
                  <div
                    className={`header-option ${selectedOption === "loggin" ? 'hovered' : ''}`}
                    onMouseEnter={() => handleMouseEnter("loggin")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <li>LoggIn</li>
                    <div
                      className={`underline ${selectedOption === "loggin" ? 'visible' : ''}`}
                    ></div>
                  </div>
                </Link>
                <Link to='/user/register' style={{ textDecoration: 'none' }}>
                  <div
                    className={`header-option ${selectedOption === "register" ? 'hovered' : ''}`}
                    onMouseEnter={() => handleMouseEnter("register")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <li>Register</li>
                    <div
                      className={`underline ${selectedOption === "register" ? 'visible' : ''}`}
                    ></div>
                  </div>
                </Link>
              </ul>
            )
          }

        </div>
        <div className={`menu ${burgerMenu ? 'open' : ''}`}>
          <div className="hamburger" onClick={burgerMenuFunction}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </header>
      <BurgerMenu trigger={burgerMenu} setTrigger={setBurgerMenu}></BurgerMenu>
    </div>
  )
}

export default header