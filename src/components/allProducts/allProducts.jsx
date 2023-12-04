import React, { useState, useEffect } from "react";
import './allProducts.css'
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import CardProductsBrands from "../cardProductsBrands/cardProductsBrands"
import FilterProdcuts from "../filterProducts/filterProducts"
import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function allProducts() {
  const [brandProducts, setBrandProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allBrandsModels, setAllBrandsModels] = useState([]);
  const [allVersions, setAllVersions] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [allBodyCars, setAllBodyCars] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // products
        const productsResponse = await fetchApi(`${appInfo.root}/cars`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setBrandProducts(productsResponse);
        setProducts(productsResponse);

        // brands
        const brandsResponse = await fetchApi(`${appInfo.root}/cars/brands`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setAllBrands(brandsResponse);

        // bodyCars
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

        // versions
        const versionsResponse = await fetchApi(`${appInfo.root}/cars/versions`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setAllVersions(versionsResponse);

        // colors
        const colorsResponse = await fetchApi(`${appInfo.root}/cars/colors`, {
          method: 'GET',
        }, (resolve, reject) => {
          if(reject) console.error(reject)
            return resolve.data
          }
        )
        setAllColors(colorsResponse);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  
  function calculateDiscountedPrice(price, discountPercentage) {
    const discountedPrice = price - (price * (discountPercentage / 100));
    return discountedPrice.toFixed(0); 
  }

  
  return(
  brandProducts && allBrands && allBrandsModels ? (
    <div className="brandProductsContainer">
      <FilterProdcuts brands={allBrands} models={allBrandsModels} versions={allVersions} colors={allColors} products={products} setBrandProducts={setBrandProducts} bodyCar={allBodyCars} ></FilterProdcuts>
      <div className="cardProductsDiv">
        {brandProducts.length > 0 ? brandProducts.map((cars) => (
          <div key={cars.id} className="cardProductsbrandsContainer">
            <CardProductsBrands productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={cars.images} CarsID={cars.id} carsUserID={cars.user_id} carsModelName={cars.model.name} carsPrice={cars.price} carsKM={cars.km} carsYear={cars.year} carsOnSale={ cars.onSale ? (calculateDiscountedPrice(cars.price, cars.onSale)) : null} carsOnSaleNumber={cars.onSale ? (cars.onSale) : null}/>
          </div>
        )) : null}
      </div>
    </div>
  ) : null ) 
}

export default allProducts