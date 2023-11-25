import React from "react";
import './sellCar.css'
import SellCarBlock from "../../components/sellCarBlock/sellCarBlock"

function sellCar(props) {

return (
  <div className="sellCar">
    <SellCarBlock typeUpdate={props.typeUpdate} ></SellCarBlock>
  </div>
  )
}

export default sellCar