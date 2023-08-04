import React, { useState, useEffect,useRef } from "react";
import './brandsCarousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function brandsCarousel() {

    const [brands, setBrands] = useState([]);
    
    const filaRef = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/cars/brands');
          const jsonData = await response.json();
          setBrands(jsonData.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
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
      return (
        <div className="brandsComponent" ref={filaRef}>  
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" onClick={handleFlechaIzquierdaClick} />
          <div className="brandsContainer" > 
            {brands.map((brand) => (
              <article key={brand.id} className="brand">
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