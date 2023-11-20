import React from "react";
import './banner.css'
import carBanner from "../../public/carBannerExample.jpg"

function banner() {

return (
  <div className="homeBanner">
    <img alt="auto" src={carBanner} className="imageBanner"/>
    <div className="componentBanner">
  </div>
  </div>
  )
}

export default banner