import React from "react";
import './cardProducts.css'
import ImgCarrusel from "../imgCarrousel/imgCarrousel";
import { useNavigate } from 'react-router-dom';

function cardProducts({carsImage,CarsID,carsUserID,carsModelName,carsPrice,carsKM,carsYear,productDescriptionClass, productArticleClass}) {

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
return(
<div className={productArticleClass} key={CarsID} onClick={() => {productOnClick(CarsID)}}>
          <ImgCarrusel
          imgArray={objToArray(JSON.parse(carsImage))}
          id={carsUserID}
          productImgClassName={"productsImage"}
          nextButtonClassName={"nextButton"}
          prevButtonClassName={"prevButton"}
        />
        <div className="productInfoContainer">
        <h3 className="productInfo">{carsModelName}</h3>
        <h3 className="productInfo" id="productPrice">{carsPrice}$</h3>
        </div>
        <div className = {productDescriptionClass}>
        <h3 className="productInfo" id="productKM">{carsKM}KM</h3>
        <div className="divider"></div>
        <h3 className="productInfo" id="productYear">{carsYear}</h3>
        </div>
</div>
)
}

export default cardProducts