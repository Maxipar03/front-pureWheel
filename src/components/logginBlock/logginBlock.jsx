import React, { useEffect, useRef, useState } from 'react'
import { fetchApi, addValueToArray } from "../../modules/mainModules";
import './logginBlock.css'
import appInfo from '../../modules/appInfo';
import ErrorBlock from "../errors/errorBlock/errorBlock";
import bmwImage from "../../public/BannerPureWheelPrueba.png"
import logo from "../../public/LogoPureWheelPNG3.png"

function loggin() {
  //***** States *****
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  // Validation states
  const [emailErrorStatus, setEmailErrorStatus] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState('')

  // ***** References *****
  const refEmail = useRef()
  const refPassword = useRef()
  //***** Changes *****
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setEmailErrorStatus(false)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setPasswordErrorStatus(false)
  }
  const handleRememberChange = (event) => {
    setRemember(event.target.checked)
  }

  //***** Validations *****
  const emailValidation = (e) => {
    const emailInfo = e.target.value
    const isEmail = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(emailInfo)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInfo)
    if (emailInfo === "") {
      setEmailErrorStatus(true)
      setEmailMsg('You must complete with your mail')
    }
    if (isEmail && !isValidEmail) {
      setEmailErrorStatus(true)
      setEmailMsg('Invalid email')
    }
    if (!isEmail) {
      if (emailInfo.length < 10) {
        setEmailErrorStatus(true)
        setEmailMsg('Invalid phone')
      } else {
        setEmailErrorStatus(false)
      }
    }
  }
  const passwordValidation = (e) => {
    const passwordData = e.target.value
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /\d/
    const specialCharRegex = /[!@#$%^&*]/
    if (passwordData.length < 8 || !uppercaseRegex.test(passwordData) || !numberRegex.test(passwordData) || !specialCharRegex.test(passwordData)) {
      setPasswordErrorStatus(true)
      setPasswordMsg('Invalid password')
    } else {
      setPasswordErrorStatus(false)
    }
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
      addValueToArray(loggAuth, 'email')
    }
    if (isEmail && !isValidEmail) {
      addValueToArray(loggAuth, 'email')
    }
    if (!email) {
      if (email.length < 10) {
        addValueToArray(loggAuth, 'email')
      }
    }

    //Password validation
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[\W_]/.test(password)
    if (password.length < 8 || !hasUpperCase || !hasNumber || !hasSpecialChar) {
      addValueToArray(loggAuth, 'password')
    }
    if (password === "") {
      addValueToArray(loggAuth, 'password')
    }
    if (loggAuth.length == 0) {
      fetchApi(`${appInfo.root}/users/loggin`, {
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
      <div className='bannerLogin'>
        <img className='backgroundImageBanner' src={bmwImage} />
        <div className='bannerLoginContent'>
          <img className='bannerImage' src={logo} />
          <h1 className='bannerText'>Buy your car in <b className='boldTitle'>simples steps</b></h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="logginForm">
        <div className='titleContainer'>
        <h1 className='titleForm'>SIGN IN</h1>
        </div>
        <div className='logginAll'>
          <div className="logginInputContent">
            <label>Phone number or email</label>
            <input onBlur={emailValidation} value={email}
              placeholder="Email/Phone"
              ref={refEmail}
              onChange={handleEmailChange} type="text" 
              className={emailErrorStatus ? 'inputError' : 'inputSession'}></input>
              <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={emailMsg} errorStatus={emailErrorStatus}></ErrorBlock>
          </div>
          <div className="logginInputContent">
            <label>Password</label>
            <input 
              onBlur={passwordValidation} 
              ref={refPassword}
              value={password}
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange} 
              className={passwordErrorStatus ? 'inputError' : 'inputSession'}></input>
              <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={passwordMsg} errorStatus={passwordErrorStatus}></ErrorBlock>
          </div>
          <div className="rememberMe">
            <h4>Remember me</h4>
            <div className="checkbox-wrapper-64">
              <label className="switch">
                <input
                  checked={remember}
                  onChange={handleRememberChange}
                  type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <button className="button-87">Loggin</button>
        </div>
      </form>
    </div>
  )
}

export default loggin