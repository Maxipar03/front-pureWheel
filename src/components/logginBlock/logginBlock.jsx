import React, { useEffect, useRef, useState } from 'react'
import { fetchApi, addValueToArray } from "../../modules/mainModules";
import './logginBlock.css'
import appInfo from '../../modules/appInfo';
import ErrorBlock from "../errors/errorBlock/errorBlock";
import bmwImage from "../../public/carBannerLoggin.jpg"
import logo from "../../public/LogoPureWheelPNG3.png"

function loggin() {
  //***** States *****
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  // Validation states
  const [errorStatus, setErrorStatus] = useState(false)

  // ***** References *****
  const refEmail = useRef()
  const refPassword = useRef()
  //***** Changes *****
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setErrorStatus(false)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setErrorStatus(false)
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

      fetchApi(`${appInfo.root}/users/loggin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }, (resolve, reject) => {
        if (reject) {
          // console.log(reject);
          setErrorStatus(true)
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


  return (
    <div className="logginComponent">
      <div className='bannerLogin'>
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
            <div className="inputContainerError">
              <input value={email}
                placeholder="Email/Phone"
                ref={refEmail}
                onChange={handleEmailChange} type="text"
                className={errorStatus ? 'inputError' : 'inputSession'}></input>
              {/* <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={emailMsg} errorStatus={emailErrorStatus}></ErrorBlock> */}
            </div>
          </div>
          <div className="logginInputContent">
            <label>Password</label>
            <div className="inputContainerError">
              <input
                ref={refPassword}
                value={password}
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                className={errorStatus ? 'inputError' : 'inputSession'}
              ></input>
            </div>
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
          <ErrorBlock divClassName='errorBlock-div' msgClassName='errorBlock-msg' iconClassName='iconError' errorStatus={errorStatus} msg={'User or password invalid'} />
        </div>
      </form>
    </div>
  )
}

export default loggin