import React from "react";
import './cardProductsBrands.css'
import ImgCarrusel from "../imgCarrousel/imgCarrousel";
import { useNavigate } from 'react-router-dom';

function cardProductsBrands({carsImage,CarsID,carsUserID,carsModelName,carsPrice,carsKM,carsYear,productDescriptionClass, productArticleClass,carsOnSale, carsOnSaleNumber}) {

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
          productImgClassName={"productsImageBrand"}
          nextButtonClassName={"nextButton"}
          prevButtonClassName={"prevButton"}
          carsSale={carsOnSaleNumber}
        />
        <div className="productInfoContainerBrands">
        <h3 className="productInfoBrands">{carsModelName}</h3>
        {carsOnSale ? 
          <div className="productPriceDiscountContainer">
           <h2 className="productInfoPrice" id="productPriceBrand">${carsOnSale}</h2>
           <h2 className="productInfoPriceDiscount" id="productPriceBrand"><span className="line-throw-detail">${carsPrice}</span></h2>
         </div>  :
          <div >
           <h2 className="productInfoPrice" id="productPriceBrand">${carsPrice}</h2>
         </div>
        }
        </div>
        <div className = {productDescriptionClass}>
        <h3 className="productInfoBrands" id="productKM">{carsKM}KM</h3>
        <div className="divider"></div>
        <h3 className="productInfoBrands" id="productYear">{carsYear}</h3>
        </div>
</div>
)
}

export default cardProductsBrands