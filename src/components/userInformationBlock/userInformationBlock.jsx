import React, { useState } from "react";
import './userInformationBlock.css';
import carBanner from "../../public/pngwing.com.png";

function UserInformationBlock({ setSelectedOptionProp }) {
  const [selectedOption, setSelectedOption] = useState("UserInfo");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOptionProp(option); 
  }

  return (
    <div className="userInformationContainer">
      <div className="userInformationContent">
        <img className="userInformationProfileImage" src={carBanner} alt="Profile Image" />
        <ul className="userInformationOptionContainer">
          <li onClick={() => handleOptionClick("UserInfo")} className={selectedOption === "UserInfo" ? "userInformationOption-active" : "userInformationOption"}>User Information</li>
          <li onClick={() => handleOptionClick("Garage")} className={selectedOption === "Garage" ? "userInformationOption-active" : "userInformationOption"}>Garage/Favorites</li>
          <li onClick={() => handleOptionClick("Statistics")} className={selectedOption === "Statistics" ? "userInformationOption-active" : "userInformationOption"}>Last Seen/Statistics</li>
        </ul>
      </div>
    </div>
  );
}

export default UserInformationBlock;