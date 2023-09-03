import React, { useState, useEffect } from "react";
import './brandsProducts.css'
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import { useParams } from 'react-router-dom';
import CardProductsBrands from "../cardProductsBrands/cardProductsBrands"
import FilterProdcuts from "../filterProducts/filterProducts"

function brandsProducts() {
  const [products, setProducts] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars/brands/${id}`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.log(reject);
      } else {
        console.log(resolve)
        setProducts(resolve.info.carsIncluded)
        console.log(products)
      }
    });
  }, []);


  return (
    <div className="brandProductsContainer">
      <FilterProdcuts></FilterProdcuts>
      <div className="cardProductsDiv">
      {products.map((cars) => (
        <div key={cars.id} className="cardProductsbrandsContainer">
          <CardProductsBrands productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={cars.images} CarsID={cars.id} carsUserID={cars.user_id} carsModelName={cars.model.name} carsPrice={cars.price} carsKM={cars.km} carsYear={cars.year} />
          </div>
      ))}
      </div>
    </div>
  )
}

export default brandsProducts