import React, { useState, useEffect } from "react";
import './allProducts.css'
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import CardProductsBrands from "../cardProductsBrands/cardProductsBrands"
import FilterProdcuts from "../filterProducts/filterProducts"
import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function allProducts() {
  const [brandProducts, setBrandProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allBrandsModels, setAllBrandsModels] = useState([]);
  const [allBodyCars, setAllBodyCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetchApi(`${appInfo.root}/cars`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setBrandProducts(productsResponse);

        const brandsResponse = await fetchApi(`${appInfo.root}/cars/brands`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setAllBrands(brandsResponse);

        const bodyCarsResponse = await fetchApi(`${appInfo.root}/cars/chassis`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setAllBodyCars(bodyCarsResponse);

        if (brandsResponse.length > 0) {
          const brandsArr = [];
          for (const brand of brandsResponse) {
            const brandDetailsResponse = await fetchApi(`${appInfo.root}/cars/brands/${brand.id}`, {
              method: 'GET',
            }, (resolve, reject) => {
              if(reject) console.error(reject)
                return resolve
              }
            )

            const response = {
              brandId: brandDetailsResponse.data.id,
              brandName: brandDetailsResponse.data.name,
              brandLog: brandDetailsResponse.data.logo,
              models: brandDetailsResponse.info.models,
            };

            brandsArr.push(response);
          }

          setAllBrandsModels(brandsArr);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return(
  brandProducts && allBrands && allBrandsModels ? (
    <div className="brandProductsContainer">
      <FilterProdcuts brands={allBrands} models={allBrandsModels} products={brandProducts} setBrandProducts={setBrandProducts} bodyCar={allBodyCars} ></FilterProdcuts>
      <div className="cardProductsDiv">
        {brandProducts.length > 0 ? brandProducts.map((cars) => (
          <div key={cars.id} className="cardProductsbrandsContainer">
            <CardProductsBrands productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={cars.images} CarsID={cars.id} carsUserID={cars.user_id} carsModelName={cars.model.name} carsPrice={cars.price} carsKM={cars.km} carsYear={cars.year} />
          </div>
        )) : null}
      </div>
    </div>
  ) : null ) 
}

export default allProducts