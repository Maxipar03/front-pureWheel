import React, { useState, useEffect } from "react";
import appInfo from "../../modules/appInfo";
import "./imgCarrouselDetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faL } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function imgCarrouselDetail({ imgArray, id, productImgClassName, nextButtonClassName, prevButtonClassName }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuIsOpen, setMenuIsOpen] = useState(false)


  const nextImage = () => {
    setCurrentImageIndex((prevImage) => (prevImage + 1) % imgArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevImage) =>
      prevImage === 0 ? imgArray.length - 1 : prevImage - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index)
  };

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuIsOpen]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>

      <div className="image-carouselDetail">
    <div className="bottom-shadow-left">
      <button onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }} className="icd-arrow icd-left">
  <svg width="60px" height="80px" viewBox="0 0 50 80" xmlSpace="preserve">
    <polyline fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points="
  45.63,75.8 0.375,38.087 45.63,0.375 "/>
  </svg>  
</button>
  </div>

        <img
          className={productImgClassName}
          src={`${appInfo.root}/images/cars/user_${id}/${imgArray[currentImageIndex]}`}
          alt=""
          onClick={() => setMenuIsOpen(true)}
        />
        <FontAwesomeIcon className="heart" icon={faHeart} />
        <div className="bottom-shadow-right">
        <button onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }} className="icd-arrow icd-right">
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xmlSpace="preserve">
    <polyline fill="none" stroke="#F5F5F5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points="
  0.375,0.375 45.63,38.087 0.375,75.8 "/>
  </svg>
</button>
</div>

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
      {
        menuIsOpen && (
          <div className="imageFullWidhtContainer">
            <FontAwesomeIcon icon={faXmark} onClick={() => setMenuIsOpen(false)} className="closeXdetail" />
            <div>
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
                className="fullWidhtImage"
                src={`${appInfo.root}/images/cars/user_${id}/${imgArray[currentImageIndex]}`}
                alt=""
                onClick={() => setMenuIsOpen(true)}
              />
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
          </div>
        )
      }
    </>
  );
}

export default imgCarrouselDetail