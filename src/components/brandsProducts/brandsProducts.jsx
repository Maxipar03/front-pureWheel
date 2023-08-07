import React, { useState, useEffect } from "react";
import './brandsProducts.css'
import { useParams } from 'react-router-dom';
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";



function brandsProducts() {
  const { id } = useParams();
  const [brandProducts, setBrandProducts] = useState([])

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars/brands/${id}`, {
      method: 'GET',
    }, (resolve, reject) => {
      if(reject){console.log(reject);}else{
        console.log(resolve.info.carsIncluded)
      }
    });
  }, []);

 

  return (
    <div className="a">
      <h1>Hola</h1>
    </div>
  )
}

export default brandsProducts