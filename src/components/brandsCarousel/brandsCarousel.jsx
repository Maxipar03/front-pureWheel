import React, { useState, useEffect,useRef } from "react";
import './brandsCarousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";

function brandsCarousel() {

    const [brands, setBrands] = useState([]);
    
    const filaRef = useRef(null);

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars/brands`, {
      method: 'GET',
    }, (resolve, reject) => {
      if(reject){console.log(reject);}else{
        setBrands(resolve.data);
      }
    });
  }, []);

    const handleFlechaDerechaClick = () => {
      if (filaRef.current) {
        filaRef.current.scrollLeft += filaRef.current.offsetWidth;
      }
    };
  
    const handleFlechaIzquierdaClick = () => {
      if (filaRef.current) {
        filaRef.current.scrollLeft -= filaRef.current.offsetWidth;
      }
    };

    const brandsOnClick = (id) => {
      window.location.href = `products/brands/${id}` 
    }

      return (
        <div className="brandsComponent" ref={filaRef}>        
          <FontAwesomeIcon icon={faAngleLeft} className="arrowLeft" onClick={handleFlechaIzquierdaClick} />
          <div className="brandsContainer" > 
            {brands.map((brand) => (
              <article key={brand.id} className="brand" onClick={() => {brandsOnClick(brand.id)}}>
                <img
                  className="brandImage"
                  src={`${appInfo.root}/images/brands/${brand.logo}`}
                  alt={brand.name}
                />
              </article>
            ))}    
          </div>
          <FontAwesomeIcon icon={faAngleRight} className="arrowRight" onClick={handleFlechaDerechaClick} />
   
          </div>
        
      );
    }

export default brandsCarousel