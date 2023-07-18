import React from "react";
import './registerBlock.css'

function register() {

return (
  <div className="">
   <form className="registerForm">
      <label>Profile image</label>
      <input type="file"></input>  
      <label>Name</label>
      <input type="text"></input>
      <label>Surname</label>
      <input type="text"></input>
      <label>Phone number</label>
      <input type="number"></input>
      <label>Identification</label>
      <input type="number"></input>
      <label>birthdate</label>
      <input type="date"></input> 
      <label>Password</label>
      <input type="password"></input>
      <div>
      <input type="checkbox"></input>
      <p>Remember</p>
      </div>
      <button>Register</button>
   </form>
  </div>
  )
}

export default register