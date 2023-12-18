import React, { useState, useEffect, useRef } from "react";
import './brandsCarousel2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import Slider from "react-slick";
import { FadeLoader } from "react-spinners";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function brandsCarousel2() {

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true)

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "blue" }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", fontSize: "1px" }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars/brands`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) { console.log(reject); } else {
        setBrands(resolve.data);
        setLoading(false)
      }
    });
  }, []);

  const brandsOnClick = (id) => {
    window.location.href = `products/brands/${id}`
  }

  ////////////////////
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Activa la reproducción automática
    pauseOnHover: false, // Evita que se detenga al pasar el ratón por encima
    cssEase: 'linear', // Establece la transición lineal entre las imágenes
    waitForAnimate: false, // Evita la pausa al final de la transición
    mobileFirst: true,
    responsive: [{

      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        dots: true,
        arrows: false
      }

    }]
  };

  return (
    <div className="brandsBackgroundTest">
      <div className="brandsComponent2">
        <div className="slickCarouselContainer">
          {loading ? (
    <div className="skeletonContainer">
      <FadeLoader  color="#a8b7b4"
  margin={0} />
      <p className="loadingText">Loading...</p>
  </div>

            ) : (
            <>
              <Slider {...settings}>
                {brands.map((brand) => (
                  <article key={brand.id} >
                    <img
                      onClick={() => { brandsOnClick(brand.id) }}
                      className="brandImage"
                      src={`${appInfo.root}/images/brands/${brand.logo}`}
                      alt={brand.name}
                    />
                  </article>
                ))}
              </Slider>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default brandsCarousel2