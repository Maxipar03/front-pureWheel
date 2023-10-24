import React, { useEffect, useState } from "react";
import './userSelectedBlock.css';


function userSelectedBlock({ selectedOption }) {

      let contentToRender;

  if (selectedOption === "UserInfo") {
    contentToRender = (
      <div>
      <div>
        <h1 className="userInfoTitle">User Info</h1>
      </div>
      <div>
      <input type="text" />
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