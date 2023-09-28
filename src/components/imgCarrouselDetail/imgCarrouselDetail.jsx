import React, {useState, useEffect } from "react";
import appInfo from "../../modules/appInfo";
import "./imgCarrouselDetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faL } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function imgCarrouselDetail({ imgArray, id , productImgClassName, nextButtonClassName, prevButtonClassName}) {

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
              onClick={() => setMenuIsOpen(true)}
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