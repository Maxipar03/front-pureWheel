import React, { useState, useEffect } from "react";
import './brandsCarousel.css'

function brandsCarousel() {

    const [brands, setBrands] = useState([]);

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

      return (
        <div className="brandsComponent">
          <div className="brandsContainer"> 
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
          </div>
      );
    }

export default brandsCarousel