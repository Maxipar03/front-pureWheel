import React, { useState, useEffect } from "react";
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import './bodyCarHome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function bodyCarHome() {

    const [bodyCar, setBodyCar] = useState([]);

    useEffect(() => {
      fetchApi(`${appInfo.root}/cars/chassis`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (resolve, reject) => {
        if (reject) {
          console.log(reject);
        } else {
          setBodyCar(resolve.data);
        }
      })
    }, []);
    
    return(
      <div className="productsComponent">
        <h1 className="productsSaleTitle">Select your body car</h1>
      <div className="allProductsContainer">
          {bodyCar.map((carBody) => (
            <div className="bodyCarContainer">
            <img className="bodyCarimages" src={`${appInfo.root}/images/chasses/${carBody.image}`}/>
            <h1>{carBody.name}</h1>
            </div>
            ))}
            </div>
      </div>
    )
    }

export default bodyCarHome