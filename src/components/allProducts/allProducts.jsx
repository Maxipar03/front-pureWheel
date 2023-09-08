import React, { useState, useEffect } from "react";
import './allProducts.css'
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import CardProductsBrands from "../cardProductsBrands/cardProductsBrands"
import FilterProdcuts from "../filterProducts/filterProducts"
import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function allProducts() {
  const [brandProducts, setBrandProducts] = useState([])
  const [allBrands, setAllBrands] = useState([])
  const [allBrandsModels, setAllBrandsModels] = useState([])

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.error(reject);
      } else {
        setBrandProducts(resolve.data)
      }
    });

    fetchApi(`${appInfo.root}/cars/brands`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.error(reject);
      } else {
        setAllBrands(resolve.data)
      }
    });
  }, []);

  useEffect(() => {
    if (allBrands.length > 0) {
      const brandsArr = []
      allBrands.forEach((brand) => {
        fetchApi(`${appInfo.root}/cars/brands/${brand.id}`, {
          method: 'GET',
        }, (resolve, reject) => {
          if (reject) {
            console.error(reject);
          } else {
            const response = {
              brandId: resolve.data.id,
              brandName: resolve.data.name,
              brandLog: resolve.data.logo,
              models: resolve.info.models

            }

            brandsArr.push(response);
          }
        });
      })
      setAllBrandsModels(brandsArr)
    }
  }, [allBrands])


  return (
    <div className="brandProductsContainer">
      <FilterProdcuts brands={allBrands} models={allBrandsModels} ></FilterProdcuts>
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