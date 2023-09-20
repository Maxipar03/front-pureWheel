import React, {useState } from "react";
import appInfo from "../../modules/appInfo";
import "./imgCarrouselDetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function imgCarrouselDetail({ imgArray, id , productImgClassName, nextButtonClassName, prevButtonClassName}) {

        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
        const nextImage = () => {
          setCurrentImageIndex((prevImage) => (prevImage + 1) % imgArray.length);
        };
    
        const prevImage = () => {
          setCurrentImageIndex((prevImage) =>
            prevImage === 0 ? imgArray.length - 1 : prevImage - 1
          );
        };

        const selectImage = (index) => {
            setSelectedImageIndex(index);
            setCurrentImageIndex(index)
          };
    
        return (
          <div className="image-carouselDetail">          
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
         
          <div className="image-thumbnails">
          {imgArray.map((img, index) => (
            <img
              key={index}
              src={`${appInfo.root}/images/cars/user_${id}/${img}`}
              alt=""
              className={index === currentImageIndex ? "thumbnail selected" : "thumbnail"}
              onClick={() => selectImage(index)}
            />
          ))}
          </div>
          </div>   
        );
      }

    export default imgCarrouselDetail