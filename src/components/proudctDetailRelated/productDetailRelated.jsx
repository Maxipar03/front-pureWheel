import React from "react";
import './productDetailRelated.css'
import ImgCarrusel from "../imgCarrousel/imgCarrousel";
import { useNavigate } from 'react-router-dom';

function productDetailRelated({carsImage,CarsID,carsUserID,carsModelName,carsPrice,carsKM,carsYear,productDescriptionClass, productArticleClass}) {

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
          productImgClassName={"productsImageRelated"}
          nextButtonClassName={"nextButton"}
          prevButtonClassName={"prevButton"}
        />
        <div className="productInfoContainerRelated">
        <h3 className="productInfoRelated">{carsModelName}</h3>
        <h3 className="productInfoRelated" id="productPriceBrand">{carsPrice}$</h3>
        </div>
        <div className = {productDescriptionClass}>
        <h3 className="productInfoRelated" id="productKM">{carsKM}KM</h3>
        <div className="divider"></div>
        <h3 className="productInfoRelated" id="productYear">{carsYear}</h3>
        </div>
</div>
)
}

export default productDetailRelated
