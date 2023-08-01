import React, { useEffect, useRef, useState } from 'react'
import { fetchApi, addValueToArray } from "../../modules/mainModules";
import './logginBlock.css'
import bmwImage from "../../../public/IMG_7137-tiny-2048x0-0.5x0.jpg"
import logo from "../../../public/PureWheel(4).png"

function loggin() {
  //***** States *****
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  // ***** References *****
  const refEmail = useRef()
  const refPassword = useRef()
  //***** Changes *****
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleRememberChange = (event) => {
    setRemember(event.target.checked)
  }
  //***** Submit *****
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      email,
      password,
      remember
    }
    const loggAuth = []

    //Email/phone validation
    const isEmail = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(email)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (email === "") {
      //ERRORDISPLAY('You must complete with your mail')
      addValueToArray(loggAuth, 'email')
    }
    if (isEmail && !isValidEmail) {
      //ERRORDISPLAY ('Invalid email')
      addValueToArray(loggAuth, 'email')
    }
    if (!email) {
      if (email.length < 8) {
        //ERRORDISPLAY ('Invalid phone')
        addValueToArray(loggAuth, 'email')
      }
    }

    //Password validation
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[\W_]/.test(password)
    if (password.length < 8 || !hasUpperCase || !hasNumber || !hasSpecialChar) {
      //ERRORDISPLAY ('Invalid password')
      addValueToArray(loggAuth, 'password')
    }
    if (password === "") {
      //ERRORDISPLAY ('Password is required')
      addValueToArray(loggAuth, 'password')
    }
    if (loggAuth.length == 0) {
      fetchApi('http://localhost:3000/users/loggin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }, (resolve, reject) => {
        if (reject) {
          //ERRORDISPLAY(CONTROLEACH)
        } else {
          delete resolve.data.password
          if (resolve.info.token) {
            sessionStorage.setItem('token', JSON.stringify(resolve.info.token))
            sessionStorage.setItem('userLogged', JSON.stringify(resolve.data))
            window.location.href = '/'
          }
          if (resolve.info.permanentToken) {
            localStorage.setItem('token', JSON.stringify(resolve.info.permanentToken))
            sessionStorage.setItem('userLogged', JSON.stringify(resolve.data))
            window.location.href = '/'
          }
        }
      })
    }
  }


  return (
    <div className="logginComponent">
      <div className="logginBannerContainer">
        <img className="logginLogo" src={logo} />
        <h1>PureWheel</h1>
        <h2>Loggin</h2>
      </div>
      <img className="carImage" src={bmwImage} alt="car" />
      <form onSubmit={handleSubmit} className="logginForm">
        <div className="logginInputContent">
          <label>Name or phone number</label>
          <input value={email}
            placeholder="Email"
            ref={refEmail}
            onChange={handleEmailChange} type="text"></input>
        </div>
        <div className="logginInputContent">
          <label>Password</label>
          <input ref={refPassword}
            value={password}
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}></input>
        </div>
        <div className="rememberMe">
          <h4>Remember me</h4>
          <div class="checkbox-wrapper-64">
            <label class="switch">
              <input 
                checked={remember}
                onChange={handleRememberChange}
                type="checkbox" />
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