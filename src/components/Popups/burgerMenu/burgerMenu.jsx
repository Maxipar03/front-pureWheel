import React, { useEffect } from 'react'
import "./burgerMenu.css";
import { Link } from 'react-router-dom';

function burguerMenu(props) {

  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))

  const closePopup = () => {
    props.setTrigger(false)
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (props.trigger) ? (
    <div onClick={closePopup} className="bm-App-choose">
      <div className="bm-main-choose">
        <div className="bm-choose-main-div">
        <div className='close-popup'><i onClick={closePopup} className="fa-solid fa-xmark"></i></div>
          {userLogged ?
            <div className="bm-choose-options">
              <Link className='bm-link' onClick={closePopup} to="">About Us</Link>
              <Link className='bm-link' onClick={closePopup} to="">Buy Car</Link>
              <Link className='bm-link' onClick={closePopup} to="">Sell Car</Link>
              <Link className='bm-link' onClick={closePopup} to="">Favorites</Link>
            </div> :
            <div className="bm-choose-options">
              <Link className='bm-link' onClick={closePopup} to="/user/loggin">Loggin</Link>
              <Link className='bm-link' onClick={closePopup} to="/user/register">Register</Link>
            </div>
          }
          
        </div>
      </div>
    </div>) : ''
}
export default burguerMenu