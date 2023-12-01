import React from "react";
import './cardProductsBrands.css'
import ImgCarrusel from "../imgCarrousel/imgCarrousel";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function cardProductsBrands({ carsImage, CarsID, carsUserID, carsModelName, carsPrice, carsKM, carsYear, productDescriptionClass, productArticleClass, carsOnSale, carsOnSaleNumber }) {

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
    <AnimatePresence>
      <motion.div className={productArticleClass} 
        key={CarsID}
        viewport={{ once: true }} 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: CarsID * 0.2 }} 
        onClick={() => { productOnClick(CarsID) }}>
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
            </div> :
            <div >
              <h2 className="productInfoPrice" id="productPriceBrand">${carsPrice}</h2>
            </div>
          }
        </div>
        <div className={productDescriptionClass}>
          <h3 className="productInfoBrands" id="productKM">{carsKM}KM</h3>
          <div className="divider"></div>
          <h3 className="productInfoBrands" id="productYear">{carsYear}</h3>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default cardProductsBrands