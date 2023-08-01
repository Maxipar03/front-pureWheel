import React, { useRef, useState } from "react";
import { fetchApi, addValueToArray, isAgeAllow } from "../../modules/mainModules";
import './registerBlock.css'
import bmwImage from "../../../public/IMG_7137-tiny-2048x0-0.5x0.jpg"
import logo from "../../../public/PureWheel(4).png"
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
    setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
  }
  const handleSurnameChange = (e) => {
    setSurname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value)
  }
  const handleIdentificationChange = (e) => {
    setIdentification(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value)
  }
  const handleRememberChange = (e) => {
    setRemember(e.target.checked)
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
    if (email === "" || !isValidEmail || email.length < 8) {
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
    if(identification.length < 8 || isntIden){
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
    if (password != passwordConfirm) {
      //ERRORDISPLAY ('passwords doesn't match')
      addValueToArray(loggAuth, 'passwordConfirm')
    }
    if (loggAuth.length == 0) {
    console.log(data);  
    fetchApi('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }, (resolve, reject) => {
        if (reject) {
          //ERRORDISPLAY(CONTROLEACH)
        } else {
          if(resolve.info.token) {
            sessionStorage.setItem('token', JSON.stringify(resolve.info.token))
            sessionStorage.setItem('userLogged', JSON.stringify(resolve.data))
              window.location.href = '/'
          }
          if(resolve.info.permanentToken){
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
      <div className="registerBannerContainer">
        <img className="registerLogo" src={logo} />
        <h1>PureWheel</h1>
        <h2>Register</h2>
      </div>
      <img className="carImage" src={bmwImage} alt="car" />
      <form onSubmit={handleSubmit} className="registerForm">
        <div className="registerFormContainer">
          <div className="nameContainer">
          <div className="registerInputContent">
            <label>Name</label>
            <input onChange={handleNameChange}
          ref={refName}
          value={name} type="text" className="textFullname"></input>
          </div>
          <div className="registerInputContent">
            <label>Surname</label>
            <input onChange={handleSurnameChange}
          ref={refSurname}
          value={surname} type="text" className="textFullname"></input>
          </div>
          <div className="registerInputContent">
            <label>Email</label>
            <input onChange={handleEmailChange}
          ref={refEmail}
          value={email} type="email" className="textFullname"></input>
          </div>
          </div>
          <div className="registerInputContent">
            <label>Phone number</label>
            <input  onChange={handlePhoneChange}
          ref={refPhone}
          value={phone} type="number"></input>
          </div>
          <div className="registerInputContent">
            <label>Identification</label>
            <input onChange={handleIdentificationChange}
          ref={refIdentification}
          value={identification} type="number" placeholder="Identification"></input>
          </div>
          <div className="registerInputContent">
            <label>birthdate</label>
            <input onChange={handleBirthdateChange}
          ref={refBirthdate}
          value={birthdate} type="date"></input>
          </div>
          <div className="registerInputContent">
            <label>Password</label>
            <input  onChange={handlePasswordChange}
          ref={refPassword}
          value={password} type="password"></input>
          </div>
          <div className="registerInputContent">
            <label>Confirm Password</label>
            <input onChange={handlePasswordConfirmChange} value={passwordConfirm} type="password"></input>
        </div>
        </div>
        <button className="button-87">register</button>
      </form>
    </div>
  )
}




export default register