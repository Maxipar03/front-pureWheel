import React, { useState, useEffect,useRef } from "react";
import './brandsCarousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { fetchApi } from "../../modules/mainModules";

function brandsCarousel() {

    const [brands, setBrands] = useState([]);
    
    const filaRef = useRef(null);


  useEffect(() => {
    fetchApi('http://localhost:3000/cars/brands', {
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

    console.log(filaRef)

      console.log(brands)
      
      const brandsOnClick = (id) => {
        window.location.href = `products/brands/${id}` 
      }

      return (
        <div className="brandsComponent" ref={filaRef}>  
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" onClick={handleFlechaIzquierdaClick} />
          <div className="brandsContainer" > 
            {brands.map((brand) => (
              <article key={brand.id} className="brand" onClick={() => {brandsOnClick(brand.id)}}>
                <img
                  className="brandImage"
                  src={`http://localhost:3000/images/brands/${brand.logo}`}
                  alt={brand.name}
                />
                <h1 className="brandName">{brand.name}</h1>
              </article>
            ))}    
          </div> 
      <FontAwesomeIcon icon={faArrowRight} className="arrowRight" onClick={handleFlechaDerechaClick} />
          </div>
        
      );
    }

export default brandsCarousel