import React from "react";
import './cardProducts.css'
import appInfo from "../../modules/appInfo";
import ImgCarrusel from "../imgCarrousel/imgCarrousel";
import { useNavigate } from 'react-router-dom';


function cardProducts({ carInfo ,carsImage, brandImage, CarsID, carsUserID, carsModelName, carsPrice, carsKM, carsYear, productDescriptionClass, productArticleClass, carsSale }) {

  const navigateTo = useNavigate();

  const productOnClick = (id) => {
    navigateTo(`/products/detail/${id}`)
  }

  function objToArray(obj) {
    const imagesToArray = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        imagesToArray.push(obj[key]);
      }
    }
    return imagesToArray;
  }

  
  return (
    <div className={productArticleClass} key={CarsID} onClick={() => { productOnClick(CarsID) }}>
      <ImgCarrusel
        imgArray={objToArray(JSON.parse(carsImage))}
        id={carsUserID}
        productImgClassName={"productsImage"}
        nextButtonClassName={"nextButton"}
        prevButtonClassName={"prevButton"}
        carID = {CarsID}
        carInfo = {carInfo}
      />
      <div className="productInfoContainer">
        <div className="productInfoTop">
          <div className="productInfoNameBrand">
            <h3 className="productInfo">{carsModelName}</h3>
            <img className="productInfoBrandImg" src={`${appInfo.root}/images/brands/${brandImage}`} />
          </div>
          <div className="productInfoYearContainer">
            <h3 className="productInfo">{carsYear}</h3>
          </div>
        </div>
        <div className="productInfoPriceContainer">
        <h3 className="productInfo" id="productPriceNew">{carsSale}$</h3>
        <h3 className="productInfo" id="productPriceOld"><span className="line-throw">{carsPrice}$</span></h3>
        </div>
      </div>
      <div className={productDescriptionClass}>
        <h3 className="productInfo" id="productKM">{carsKM}KM</h3>
        <div className="divider"></div>
        <h3 className="productInfo" id="productYear">{carsYear}</h3>
      </div>
    </div>
  )
}

export default cardProducts