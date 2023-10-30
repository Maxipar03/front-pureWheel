import React, { useEffect, useState } from "react";
import './userSelectedBlock.css';


function userSelectedBlock({ selectedOption }) {

  const [editActive, setEditActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [birthdate, setBirthdate] = useState("");

  // Functions
  const editActiveFunction = () => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));

  };
  const cancelButton = () => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    setName(userLogged.name);
    setEmail(userLogged.email);
    setImage(userLogged.image);
    setSurname(userLogged.surname);
    setPhoneNumber(JSON.parse(userLogged.phoneNumber));
    setBirthdate(userLogged.birthdate);
  };
  // Handlers
  const handleName = (e) => setName(e.target.value)
  const handleSurname = (e) => setSurname(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePhoneNumber = (e) => setPhoneNumber([["+54"], [e.target.value]])

  let contentToRender

  useEffect(() => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    setName(userLogged.name);
    setEmail(userLogged.email);
    setImage(userLogged.image);
    setSurname(userLogged.surname);
    setPhoneNumber(JSON.parse(userLogged.phoneNumber));
    setBirthdate(userLogged.birthdate);
  }, []);

  useEffect(() => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    console.log(userLogged.phoneNumber);
    console.log(phoneNumber);
    if (name != userLogged.name || email != userLogged.email || surname != userLogged.surname || JSON.stringify(phoneNumber) != userLogged.phoneNumber) setEditActive(true);
    if (name === userLogged.name && email === userLogged.email && surname === userLogged.surname && JSON.stringify(phoneNumber) === userLogged.phoneNumber)  setEditActive(false)
  }, [name, email, surname, phoneNumber]);





  if (selectedOption === "UserInfo") {
    contentToRender = (
      <div className="userInfoContainer">
        <div className="userInfoTitleDiv">
          <h1 className="userInfoTitle" >User Info</h1>
        </div>
        <div className="userInfoInputsContainer">
          <div className="userInfoInputDiv">
            <label>Name</label>
            <input onChange={(e) => {
              editActiveFunction()
              handleName(e)
            }} id="userInfoInput" type="text" value={name} />
          </div>
          <div className="userInfoInputDiv">
            <label>Surname</label>
            <input onChange={(e) => {
              editActiveFunction()
              handleSurname(e)
            }} id="userInfoInput" type="text" value={surname} />
          </div>
          <div className="userInfoInputDiv">
            <label>Email</label>
            <input onChange={(e) => {
              editActiveFunction()
              handleEmail(e)
            }} id="userInfoInput" type="text" value={email} />
          </div>
          <div className="userInfoInputDiv">
            <label>  Phone Number</label>
            <div className="userInfoInputContainer">
              <input onChange={() => {
                editActiveFunction()
              }} className="userInfoInputAreaCode" id="userInfoInputNumber" type="text" value={phoneNumber[0]} />
              <input onChange={(e) => {
                editActiveFunction()
                handlePhoneNumber(e)
              }} id="userInfoInputNumber" className="userInfoInputPhone" type="text" value={phoneNumber[1]} />
            </div>
          </div>
        </div>
        <div className="userInfoButtonContainer">
          <button onClick={() => { cancelButton() }} className={editActive ? "userInfoButton cancelActive" : "userInfoButton cancel"}>Cancel</button>
          <button className="userInfoButton edit">Edit</button>
        </div>
      </div>
    );
  } else if (selectedOption === "Garage") {
    contentToRender = (
      <div>
        <h1 className="userInfoTitle">Garage</h1>
      </div>
    );
  } else if (selectedOption === "Statistics") {
    contentToRender = (
      <div>
        <h1 className="userInfoTitle">Statistics</h1>
      </div>
    );
  }

  return (
    <div className="userSelectedBlockBox">
      <div className="userSelectedBlockContent">
        {contentToRender}
      </div>
    </div>
  );
}

export default userSelectedBlock;