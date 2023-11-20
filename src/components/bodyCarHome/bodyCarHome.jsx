import React, { useState, useEffect } from "react";
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
import './bodyCarHome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function bodyCarHome() {

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",  color: "blue"}}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", fontSize:"1px"}}
        onClick={onClick}
      />
    );
  }

    const [bodyCar, setBodyCar] = useState([]);

    const settings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      centerPadding: "60px",
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };

    useEffect(() => {
      fetchApi(`${appInfo.root}/cars/chassis`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (resolve, reject) => {
        if (reject) {
          console.log(reject);
        } else {
          setBodyCar(resolve.data);
        }
      })
    }, []);
    
    return(
      <div className="bodyCarComponent">
        <div className="bodyCarCarouselContainer">
        <div className="slickCarouselContainer">
        <Slider {...settings}> 
          {bodyCar.map((carBody) => (
            <article className="bodyCarContainer" key={carBody.id}>
            <img className="bodyCarimages" src={`${appInfo.root}/images/chasses/${carBody.image}`}/>
            <h1>{carBody.name}</h1>
            </article> 
            ))}
          </Slider>
          </div>
          </div>   
      </div>
    )
    }

export default bodyCarHome