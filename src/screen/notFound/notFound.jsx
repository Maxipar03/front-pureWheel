import React from "react";
import './notFound.css'
import NotFoundBlock from "../../components/notFoundBlock/notFoundBlock"
import twingoSad from "../../public/twingosad.png"


function notFound() {

return (
  <div className="productsDetail">
    <NotFoundBlock></NotFoundBlock>
    <img src={twingoSad} className="notFoundImage"/>
  </div>
  )
}

export default notFound