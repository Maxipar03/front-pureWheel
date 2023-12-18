import React, { useState, useEffect } from "react";
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import './products.css'
import CardProducts from "../cardProducts/cardProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FadeLoader } from "react-spinners";

function products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

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
          setLoading(false)
        }
      })
    }, []);

    function calculateDiscountedPrice(price, discountPercentage) {
      const discountedPrice = price - (price * (discountPercentage / 100));
      return discountedPrice.toFixed(0); 
    }

    const onSaleProducts = products.filter((car) => car.onSale);
    
    return(
      <div className="productsComponent">
        <h1 className="productsSaleTitle">ON SALE<FontAwesomeIcon icon={faTag} className="iconSale" /></h1>
        {loading ?  (
    <div className="skeletonContainer">
      <FadeLoader  color="#a8b7b4"
  margin={0} />
      <p className="loadingText">Loading...</p>
  </div>
):(
      <div className="allProductsContainer">
          {onSaleProducts.map((car) => (
            <CardProducts carInfo={car} key={car.id} productArticleClass={"productsArticleHome"} productDescriptionClass={"productDescriptionContainerHome"} carsImage={car.images} CarsID={car.id} carsUserID={car.user_id} carsModelName={car.model.name} carsPrice={car.price} carsKM={car.km} brandImage={car.brand.logo} carsYear={car.year} carsSale={calculateDiscountedPrice(car.price, car.onSale)}/>
            ))}
            </div>
            )}
      </div>
    )
    }

export default products