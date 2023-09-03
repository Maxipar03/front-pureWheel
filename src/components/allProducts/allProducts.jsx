import React, { useState, useEffect } from "react";
import './allProducts.css'
import { useParams } from 'react-router-dom';
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import CardProductsBrands from "../cardProductsBrands/cardProductsBrands"
import FilterProdcuts from "../filterProducts/filterProducts"

function allProducts() {
  const [brandProducts, setBrandProducts] = useState([])

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.log(reject);
      } else {
        console.log(resolve)
        setBrandProducts(resolve.data)
        console.log(brandProducts)
      }
    });
  }, []);


  return (
    <div className="brandProductsContainer">
      <FilterProdcuts></FilterProdcuts>
      <div className="cardProductsDiv">
      {brandProducts.map((cars) => (
        <div key={cars.id} className="cardProductsbrandsContainer">
          <CardProductsBrands productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={cars.images} CarsID={cars.id} carsUserID={cars.user_id} carsModelName={cars.model.name} carsPrice={cars.price} carsKM={cars.km} carsYear={cars.year} />
          </div>
      ))}
      </div>
    </div>
  )
}

export default allProducts