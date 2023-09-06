import React, { useRef, useState } from "react";
import { fetchApi, addValueToArray, isAgeAllow } from "../../modules/mainModules";
import './registerBlock.css'
import bmwImage from "../../../public/BannerPureWheelPrueba.png"
import logo from "../../../public/LogoPureWheelPNG3.png"
import ErrorBlock from "../errors/errorBlock/errorBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function register() {
  //***** States *****
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [identification, setIdentification] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [remember, setRemember] = useState(false)
  // Validation states
  const [nameErrorStatus, setNameErrorStatus] = useState(false)
  const [nameMsg, setNameMsg] = useState('')
  const [surnameErrorStatus, setSurnameErrorStatus] = useState(false)
  const [surnameMsg, setSurnameMsg] = useState('')
  const [emailErrorStatus, setEmailErrorStatus] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [phoneErrorStatus, setPhoneErrorStatus] = useState(false)
  const [phoneMsg, setPhoneMsg] = useState('')
  const [birthdateErrorStatus, setBirthdateErrorStatus] = useState(false)
  const [birthdateMsg, setBirthdateMsg] = useState('')
  const [identificationErrorStatus, setIdentificationErrorStatus] = useState(false)
  const [identificationMsg, setIdentificationMsg] = useState('')
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState('')
  const [passwordConfirmErrorStatus, setPasswordConfirmErrorStatus] = useState(false)
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState('')

  // ***** References *****
  const refName = useRef()
  const refSurname = useRef()
  const refEmail = useRef()
  const refPhone = useRef()
  const refBirthdate = useRef()
  const refIdentification = useRef()
  const refPassword = useRef()
  const refPasswordConfirm = useRef()

  //***** Changes *****
  const handleNameChange = (e) => {
    const nameData = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    setName(nameData)
    if (nameData.length > 3) {
      setNameErrorStatus(false)
    }
  }
  const handleSurnameChange = (e) => {
    const surnameData = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    setSurname(surnameData)
    if (surnameData.length > 3) {
      setSurnameErrorStatus(false)
    }
  }
  const handleEmailChange = (e) => {
    const emailData = e.target.value
    setEmail(emailData)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData)
    if (isValidEmail && emailData.length > 8) {
      setEmailErrorStatus(false)
    }
  }
  const handlePhoneChange = (e) => {
    const phoneData = e.target.value
    setPhone(phoneData)
    const isntPhone = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(phoneData)
    if (!isntPhone || phoneData.length > 10) {
      setPhoneErrorStatus(false)
    }
  }
  const handleBirthdateChange = (e) => {
    const birthdateData = e.target.value
    setBirthdate(birthdateData)
    const confirmAge = isAgeAllow(birthdateData)
    if (confirmAge) {
      setBirthdateErrorStatus(false)
    }
  }
  const handleIdentificationChange = (e) => {
    const identificationData = e.target.value
    setIdentification(identificationData)
    const isntIden = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(identificationData)
    if (identificationData.length > 8 || !isntIden) {
      setIdentificationErrorStatus(false)
    }
  }
  const handlePasswordChange = (e) => {
    const passwordData = e.target.value
    setPassword(passwordData)
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /\d/
    const specialCharRegex = /[!@#$%^&*]/
    if (passwordData.length > 8 && uppercaseRegex.test(passwordData) && numberRegex.test(passwordData) && specialCharRegex.test(passwordData)) {
      setPasswordErrorStatus(false)
    }
  }
  const handlePasswordConfirmChange = (e) => {
    const passwordConfirmData = e.target.value
    setPasswordConfirm(passwordConfirmData)
    if (password === passwordConfirmData) {
      setPasswordConfirmErrorStatus(false)
    }
  }

  //***** Validations *****
  const nameValidation = (e) => {
    const nameInfo = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    if (nameInfo.length < 3) {
      setNameErrorStatus(true)
      setNameMsg('Complete with your name')
    } else {
      setNameErrorStatus(false)
    }
  }
  const surnameValidation = (e) => {
    const surnameInfo = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    if (surnameInfo.length < 3) {
      setSurnameErrorStatus(true)
      setSurnameMsg('Complete with your surname')
    } else {
      setSurnameErrorStatus(false)
    }
  }
  const emailValidation = (e) => {
    const emailInfo = e.target.value
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInfo)
    if (!isValidEmail || emailInfo.length < 8) {
      setEmailMsg('You must complete with valid mail')
      setEmailErrorStatus(true)
    } else {
      setEmailErrorStatus(false)
    }
  }
  const phoneValidation = (e) => {
    const phoneData = e.target.value
    const isntPhone = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(phoneData)
    if (isntPhone || phoneData.length < 10) {
      setPhoneErrorStatus(true)
      setPhoneMsg('Invalid phone')
    } else {
      setPhoneErrorStatus(false)
    }
  }
  const birthdateValidation = (e) => {
    const birthdateData = e.target.value
    const confirmAge = isAgeAllow(birthdateData)
    if (!confirmAge) {
      setBirthdateErrorStatus(true)
      setBirthdateMsg('Invalid birthdate')
    } else {
      setBirthdateErrorStatus(false)
    }
  }
  const identificationValidation = (e) => {
    const identificationData = e.target.value
    const isntIden = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(identificationData)
    if (identificationData.length < 8 || isntIden) {
      setIdentificationErrorStatus(true)
      setIdentificationMsg('Invalid identification')
    } else {
      setIdentificationErrorStatus(false)
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
  const passwordConfirmValidation = (e) => {
    const passwordConfirmData = e.target.value
    if (password != passwordConfirmData) {
      setPasswordConfirmErrorStatus(true)
      setPasswordConfirmMsg("passwords doesn't match")
    } else {
      setPasswordConfirmErrorStatus(false)
    }
  }


  //***** Submit *****
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      name,
      surname,
      email,
      password,
      phone,
      birthdate,
      identification,
      remember
    }
    const loggAuth = []

    //Name validation
    if (name.length < 3) {
      //ERRORDISPLAY('You must complete with your name')
      addValueToArray(loggAuth, 'name')
    }
    //Surname validation
    if (surname.length < 3) {
      //ERRORDISPLAY('You must complete with your surname')
      addValueToArray(loggAuth, 'surname')
    }
    //Email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValidEmail || email.length < 8) {
      //ERRORDISPLAY('You must complete with your mail')
      addValueToArray(loggAuth, 'email')
    }
    //phone validation
    const isntPhone = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(phone)
    if (isntPhone || phone.length < 8) {
      //ERRORDISPLAY ('Invalid phone')
      addValueToArray(loggAuth, 'phone')
    }
    //birthdate validation
    const confirmAge = isAgeAllow(birthdate)
    if (!confirmAge) {
      //ERRORDISPLAY ('Invalid birthdate')
      addValueToArray(loggAuth, 'birthdate')
    }
    //identification validation
    const isntIden = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(identification)
    if (identification.length < 8 || isntIden) {
      //ERRORDISPLAY ('Invalid identification')
      addValueToArray(loggAuth, 'identification')
    }
    //Password validation
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /\d/
    const specialCharRegex = /[!@#$%^&*]/
    if (password.length < 8 || !uppercaseRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
      //ERRORDISPLAY ('Invalid password')
      addValueToArray(loggAuth, 'password')
    }
    //PasswordConfirm validation
    if (password != passwordConfirm) {
      //ERRORDISPLAY ('passwords doesn't match')
      addValueToArray(loggAuth, 'passwordConfirm')
    }
    if (loggAuth.length == 0) {
      console.log(data);
      fetchApi(`${appInfo.root}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }, (resolve, reject) => {
        if (reject) {
          //ERRORDISPLAY(CONTROLEACH)
        } else {
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
    } else {
      console.log(loggAuth);
    }
  }

  return (
    <div className="registerComponent">
      <div className='bannerRegister'>
        <img className='backgroundImageBanner' src={bmwImage} />
        <div className='bannerLoginContent'>
          <img className='bannerImage' src={logo} />
          <h1 className='bannerText'>Buy your car in <b className='boldTitle'>simples steps</b></h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="registerForm">
      <div className='titleContainer'>
        <h1 className='titleForm'>REGISTER</h1>
        </div>
        <div className="registerFormContainer">
          <div className="nameContainer">
            <div className="registerInputContent">
              <label>First Name</label>
              <input onBlur={nameValidation} onChange={handleNameChange}
                ref={refName}
                value={name}  type="text" placeholder="First Name" className={nameErrorStatus ? 'inputError' : 'inputSession'} ></input>
              <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={nameMsg} errorStatus={nameErrorStatus}></ErrorBlock>
            </div>
            <div className="registerInputContent">
              <label>Last Name</label>
              <input onBlur={surnameValidation} onChange={handleSurnameChange}
                ref={refSurname}
                value={surname} type="text" className={surnameErrorStatus ? 'inputError' : 'inputSession'} placeholder="Last Name"></input>
              <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={surnameMsg} errorStatus={surnameErrorStatus}></ErrorBlock>
            </div>
          </div>
          <div className="registerInputContent">
            <label>Email</label>
            <input onBlur={emailValidation} onChange={handleEmailChange}
              ref={refEmail} placeholder="Email"
              value={email} type="email" className={emailErrorStatus ? 'inputError' : 'inputSession'} ></input>
            <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={emailMsg} errorStatus={emailErrorStatus}></ErrorBlock>
          </div>
          <div className="registerInputContent">
            <label>Phone Number</label>
            <input onBlur={phoneValidation} onChange={handlePhoneChange}
              ref={refPhone}
              value={phone} type="number" placeholder="Phone Number" className={phoneErrorStatus ? 'inputError' : 'inputSession'}></input>
            <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={phoneMsg} errorStatus={phoneErrorStatus}></ErrorBlock>
          </div>
          {/* <div className="registerInputContent">
            <label>Identification</label>
            <input onChange={handleIdentificationChange} onBlur={identificationValidation}
              ref={refIdentification}
              value={identification} type="number" placeholder="Identification" className={identificationErrorStatus ? 'inputError' : 'inputSession'}></input>
            <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={identificationMsg} errorStatus={identificationErrorStatus}></ErrorBlock>
          </div> */}
          <div className="registerInputContent">
            <label>Birthdate</label>
            <input onChange={handleBirthdateChange} onBlur={birthdateValidation}
              ref={refBirthdate}
              value={birthdate} type="date" className={birthdateErrorStatus ? 'inputError' : 'inputSession'}></input>
            <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={birthdateMsg} errorStatus={birthdateErrorStatus}></ErrorBlock>
          </div>
          <div className="registerInputContent">
            <label>Password</label>
            <input onChange={handlePasswordChange} onBlur={passwordValidation}
              ref={refPassword}
              value={password} type="password" placeholder="Password" className={passwordErrorStatus ? 'inputError' : 'inputSession'}></input>
            <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={passwordMsg} errorStatus={passwordErrorStatus}></ErrorBlock>
          </div>
          <div className="registerInputContent">
            <label>Confirm Password</label>
            <input onChange={handlePasswordConfirmChange} onBlur={passwordConfirmValidation} className={passwordConfirmErrorStatus ? 'inputError' : 'inputSession'} value={passwordConfirm} type="password" placeholder="Confirm Password"></input>
            <ErrorBlock divClassName={'errorDiv'} msgClassName={'errorMsg'} msg={passwordConfirmMsg} errorStatus={passwordConfirmErrorStatus}></ErrorBlock>
          </div>
        </div>
        <button className="button-87">register</button>
      </form>
    </div>
  )
}




export default register