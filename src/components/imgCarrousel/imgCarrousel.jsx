import React, { useState, useEffect } from "react";
import appInfo from "../../modules/appInfo";
import { fetchApi } from "../../modules/mainModules";
import "./imgCarrousel.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function imgCarrusel({ imgArray, id, productImgClassName, nextButtonClassName, prevButtonClassName, carsSale, carID }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFav, setIsFav] = useState(false)
  const [allFavs, setAllFavs] = useState([])

  const nextImage = () => {
    setCurrentImageIndex((prevImage) => (prevImage + 1) % imgArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevImage) =>
      prevImage === 0 ? imgArray.length - 1 : prevImage - 1
    );
  };

  useEffect(() => {
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    console.log(userLogged);
    const favsFetch = async ()=> {
      const allFavs = await fetchApi(
        `${appInfo.root}/cars/favss/${userLogged.id}`,
        {
          method: "GET",
        },
        (resolve, reject) => {
          if (reject) {
            console.log(reject);
          } else {
            return resolve.data;
          }
        }
      );

      setAllFavs(allFavs)
    }
    favsFetch()
  }, [carID])
  console.log(allFavs);

   const handleClickFav = (id) => {
    
   }

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
      <FontAwesomeIcon icon={regularHeart} className="heart" />
      {carsSale ? <h3 className="saleImage">-{carsSale}%</h3> : null}
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
