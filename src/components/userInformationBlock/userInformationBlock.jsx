import React, { useState ,useEffect } from "react";
import './userInformationBlock.css';
import carBanner from "../../public/pngwing.com.png";

function UserInformationBlock({ setSelectedOptionProp }) {
  const [selectedOption, setSelectedOption] = useState("UserInfo");
  const [admin, setAdmin] = useState(true)

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOptionProp(option); 
  }

  useEffect(() => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    setAdmin(true)
  }, []);

  return (
    <div className="userInformationContainer">
      <div className="userInformationContent">
        {/* <img className="userInformationProfileImage" src={carBanner} alt="Profile Image" /> */}
        <ul className="userInformationOptionContainer">
          <li onClick={() => handleOptionClick("UserInfo")} className={selectedOption === "UserInfo" ? "userInformationOption-active" : "userInformationOption"}>User Information</li>
          {admin ? <li onClick={() => handleOptionClick("Garage")} className={selectedOption === "Garage" ? "userInformationOption-active" : "userInformationOption"}>Garage</li> :
            <li onClick={() => handleOptionClick("Garage")} className={selectedOption === "Garage" ? "userInformationOption-active" : "userInformationOption"}>Favorites</li>
          }
          {admin ? <li onClick={() => handleOptionClick("Statistics")} className={selectedOption === "Statistics" ? "userInformationOption-active" : "userInformationOption"}>Statistics</li>:
           <li onClick={() => handleOptionClick("Statistics")} className={selectedOption === "Statistics" ? "userInformationOption-active" : "userInformationOption"}>Last Seen</li>
          }
        </ul>
      </div>
    </div>
  );
}

export default UserInformationBlock;