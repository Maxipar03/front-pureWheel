import React, {useState } from "react";
import appInfo from "../../modules/appInfo";
import "./imgCarrousel.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function imgCarrusel({ imgArray, id , productImgClassName, nextButtonClassName, prevButtonClassName}) {

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
            <FontAwesomeIcon
              id="arrow"
              className={prevButtonClassName}
              icon={faAngleLeft}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            />
            <img
              className={productImgClassName}
              src={`${appInfo.root}/images/cars/user_${id}/${imgArray[currentImageIndex]}`}
              alt=""
            />
            <FontAwesomeIcon className="heart" icon={faHeart}/>
            <FontAwesomeIcon
              id="arrow"
              className={nextButtonClassName}
              icon={faAngleRight}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            />
          </div>
        );
      }

    export default imgCarrusel
