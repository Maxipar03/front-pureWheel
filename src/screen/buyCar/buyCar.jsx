import React from "react";
import './buyCar.css'
import AllProducts from "../../components/allProducts/allProducts"
import transition from "../../transition";

function BuyCar() {

return (
  <div className="buyCar">
    <AllProducts></AllProducts>
  </div>
  )
}

export default  transition(BuyCar)