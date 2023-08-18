import React, { useState, useEffect } from "react";
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import './products.css'
import CardProducts from "../cardProducts/cardProducts";

function products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetchApi(`${appInfo.root}/cars`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (resolve, reject) => {
        if (reject) {
          console.log(reject);
        } else {
          setProducts(resolve.data);
        }
      })
    }, []);
    
    return(
      <div className="productsComponent">
      <div className="allProductsContainer">
          {products.map((car) => (
            <CardProducts productArticleClass={"productsArticleHome"} productDescriptionClass={"productDescriptionContainerHome"} carsImage={car.images} CarsID={car.id} carsUserID={car.user_id} carsModelName={car.model.name} carsPrice={car.price} carsKM={car.km} carsYear={car.year}/>
            ))}
            </div>
      </div>
    )
    }

export default products