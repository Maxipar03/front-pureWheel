import React from "react";
import './registerBlock.css'
import bmwImage from "../../../public/IMG_7137-tiny-2048x0-0.5x0.jpg"
import logo from "../../../public/PureWheel(4).png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function register() {

  return (
    <div className="registerComponent">
      <div className="registerBannerContainer">
        <img className="registerLogo" src={logo} />
        <h1>PureWheel</h1>
        <h2>Register</h2>
      </div>
      <img className="carImage" src={bmwImage} alt="car" />
      <form className="registerForm">
        <div className="registerFormContainer">
          <div className="nameContainer">
          <div className="registerInputContent">
            <label>Name</label>
            <input type="text" className="textFullname"></input>
          </div>
          <div className="registerInputContent">
            <label>Surname</label>
            <input type="text" className="textFullname"></input>
          </div>
          </div>
          <div className="registerInputContent">
            <label>Phone number</label>
            <input type="number"></input>
          </div>
          <div className="registerInputContent">
            <label>Identification</label>
            <input type="number" placeholder="Identification"></input>
          </div>
          <div className="registerInputContent">
            <label>birthdate</label>
            <input type="date"></input>
          </div>
          <div className="registerInputContent">
            <label>Password</label>
            <input type="password"></input>
          </div>
          <div className="registerInputContent">
            <label>Confirm Password</label>
            <input type="password"></input>
        </div>
        </div>
        <button className="button-87">register</button>
      </form>
    </div>
  )
}




export default register