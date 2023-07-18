import React from "react";
import './logginBlock.css'

function loggin() {

return (
  <div className="">
   <form className="logginForm">
      <label>Name or phone number</label>
      <input type="text"></input>
      <label>Password</label>
      <input type="password"></input>
      <div>
      <input type="checkbox"></input>
      <p>Remember</p>
      </div>
      <button>Logg in</button>
   </form>
  </div>
  )
}

export default loggin