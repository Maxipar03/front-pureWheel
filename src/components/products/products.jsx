import React, { useState, useEffect } from "react";
import './products.css'
import { fetchApi } from "../../modules/apiFetch";

function products() {
    function ImageCarousel({ imgArray, id }) {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
            }, 3000);
    
            return () => clearInterval(interval);
        }, [imgArray]);
    
        return <img className="productsImage" src={`http://localhost:3000/images/cars/user_${id}/${imgArray[currentImageIndex]}`} alt="" />;
    }
    function objToArray (obj) {
        const imagesToArray = []
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    imagesToArray.push(obj[key])
                }
        }
        return imagesToArray
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetchApi('http://localhost:3000/cars',{
        method: 'GET',
      }, (resolve) => {
        setProducts(resolve.data);
      })
    }, []);

      return (
        <div className="productsComponent">
          <div className="allProductsContainer">
            {products.map((car) => (
              <article key={car.id} className="products">
                <ImageCarousel  imgArray={objToArray(JSON.parse(car.images))} id={car.user_id}/>
                <div className="productsInfo">
                <h1>{car.brand.name}</h1>
                <p>USD${car.price}</p>
                </div>
                <div className="productsDescription">
                <p>{car.km} KM</p>
                <div className="divider"></div>
                <p>{car.year}</p>
                {car.onSale?<div className="divider"></div>:null}
                {car.onSale?<p>{car.onSale}</p>:null}
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

export default products