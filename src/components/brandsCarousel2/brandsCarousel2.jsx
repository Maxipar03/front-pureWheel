import React, { useState, useEffect,useRef } from "react";
import './brandsCarousel2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function brandsCarousel2() {

    const [brands, setBrands] = useState([]);

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
        className={className}
        onClick={onClick}
        />
      );
    }
    
  useEffect(() => {
    fetchApi(`${appInfo.root}/cars/brands`, {
      method: 'GET',
    }, (resolve, reject) => {
      if(reject){console.log(reject);}else{
        setBrands(resolve.data);
      }
    });
  }, []);

    const brandsOnClick = (id) => {
      window.location.href = `products/brands/${id}` 
    }

    ////////////////////
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      autoplay: true,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };

      return (
        <div className="brandsComponent2">
          <div className="slickCarouselContainer">
          <Slider {...settings}> 
            {brands.map((brand) => (
              <article key={brand.id} >
                <img
                  onClick={() => {brandsOnClick(brand.id)}}
                  className="brandImage"
                  src={`${appInfo.root}/images/brands/${brand.logo}`}
                  alt={brand.name}
                />
              </article>
            ))}  
            </Slider>  
          </div>
          </div>
      );
    }

export default brandsCarousel2