import React from "react";
import './logginBlock.css'
import bmwImage from "../../../public/IMG_7137-tiny-2048x0-0.5x0.jpg"
import logo from "../../../public/PureWheel(4).png"

function loggin() {

return (
  <div className="logginComponent">
  <div className="logginBannerContainer">
  <img className="logginLogo" src={logo}/>
  <h1>PureWheel</h1>
  <h2>Loggin</h2>
  </div>
  <img className="carImage" src={bmwImage} alt="car"/>
   <form className="logginForm">
      <div className="logginInputContent">
      <label>Name or phone number</label>
      <input type="text"></input>
      </div>
      <div className="logginInputContent">
      <label>Password</label>
      <input type="password"></input>
      </div>
      <div className="rememberMe">
          <h4>Remember me</h4>
          <div class="checkbox-wrapper-64">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
      </div>
      <button className="button-87">Loggin</button>
   </form>
  </div>
  )
}

export default loggin