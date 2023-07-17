import React from "react";
import './header.css'

function header() {

return (
  <div className="componentHeader">
     <header className="header">
     <div className="divLogo">
        <h1>PureWheel</h1> 
     </div>
     <div className="options">
     <ul className="selectors">
        <li>About Us</li>
        <li>Buy Car</li>
        <li>Sell car</li>
     </ul>
     <ul className="selectorsSession">
        <li>LoggIn</li>
        <li>Register</li>
     </ul>
     </div>
    </header>
  </div>
  )
}

export default header