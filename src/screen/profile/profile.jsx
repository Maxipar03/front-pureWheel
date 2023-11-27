import React, { useState,useEffect } from 'react';
import './profile.css';
import UserInformationBlock from "../../components/userInformationBlock/userInformationBlock";
import UserSelectedBlock from "../../components/userSelectedBlock/userSelectedBlock";
import { useNavigate } from "react-router-dom";


function Profile() {
  const [selectedOption, setSelectedOption] = useState("UserInfo");

  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    if (!userLogged) {
      navigate("/user/loggin"); // Corrige la ruta a "/login"
    }
  }, []); 
  return (
    <div className="profile">
      <UserInformationBlock setSelectedOptionProp={setSelectedOption} />
      <UserSelectedBlock selectedOption={selectedOption} />
    </div>
  );
}

export default Profile;