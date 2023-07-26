import React, { useState, useEffect } from "react";
import './brandsCarousel.css'
import { fetchApi } from "../../modules/apiFetch";

function brandsCarousel() {

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchApi('http://localhost:3000/cars/brands', {
      method: 'GET',
    }, (resolve) => {
      setBrands(resolve.data);
    });
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