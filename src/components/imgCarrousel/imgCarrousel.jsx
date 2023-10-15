import React, {useState } from "react";
import appInfo from "../../modules/appInfo";
import "./imgCarrousel.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function imgCarrusel({ imgArray, id , productImgClassName, nextButtonClassName, prevButtonClassName, carsSale}) {

        const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
        const nextImage = () => {
          setCurrentImageIndex((prevImage) => (prevImage + 1) % imgArray.length);
        };
    
        const prevImage = () => {
          setCurrentImageIndex((prevImage) =>
            prevImage === 0 ? imgArray.length - 1 : prevImage - 1
          );
        };
    
        return (
          <div className="image-carousel">
              <div className="bottom-shadow-left-id">
      <button onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }} className="id-arrow id-left">
  <svg width="20px" height="80px" viewBox="0 0 50 80" xmlSpace="preserve">
    <polyline fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points="
  45.63,75.8 0.375,38.087 45.63,0.375 "/>
  </svg>  
</button>
  </div>
            <img
              className={productImgClassName}
              src={`${appInfo.root}/images/cars/user_${id}/${imgArray[currentImageIndex]}`}
              alt=""
            />
            <FontAwesomeIcon className="heart" icon={faHeart}/>
            {carsSale ? <h3 className="saleImage">-{carsSale}%</h3>: null}
            <div className="bottom-shadow-right-id">
            <button onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }} className="id-arrow id-right">
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="80px" viewBox="0 0 50 80" xmlSpace="preserve">
    <polyline fill="none" stroke="#F5F5F5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points="
  0.375,0.375 45.63,38.087 0.375,75.8 "/>
  </svg>
</button>
</div>
          </div>
        );
      }

    export default imgCarrusel
