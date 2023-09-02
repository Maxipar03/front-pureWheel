import React, { useState, useEffect } from "react";
import './brandsProducts.css'
import { useParams } from 'react-router-dom';
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import CardProductsBrands from "../cardProductsBrands/cardProductsBrands"
import FilterProdcuts from "../filterProducts/filterProducts"

function brandsProducts() {
  const { id } = useParams();
  const [brandProducts, setBrandProducts] = useState([])

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars/brands/${id}`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.log(reject);
      } else {
        console.log(resolve)
        setBrandProducts(resolve.info.carsIncluded)
        console.log(brandProducts)
      }
    });
  }, []);


  return (
    <div className="brandProductsContainer">
      <FilterProdcuts></FilterProdcuts>
      {brandProducts.map((cars) => (
        <div key={cars.id} className="cardProductsbrandsContainer">
          <CardProductsBrands productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={cars.images} CarsID={cars.id} carsUserID={cars.user_id} carsModelName={cars.model.name} carsPrice={cars.price} carsKM={cars.km} carsYear={cars.year} />
          </div>
      ))}
    </div>
  )
}

export default brandsProducts