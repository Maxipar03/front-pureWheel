import React, { useState, useEffect } from "react";
import './products.css'

function products() {
    function ImageCarousel({ imgArray, id }) {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
            }, 3000);
    
            return () => clearInterval(interval);
        }, [imgArray]);
    
        return <img className="productsImage" src={`http://localhost:3000/images/cars/user_${id}/${imgArray[currentImageIndex]}`} alt=""  />;
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
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/cars');
          const jsonData = await response.json();
          setProducts(jsonData.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, []);

      console.log(products)
      return (
        <div className="productsComponent">
          <div className="allProductsContainer">
            {products.map((car) => (
              <article key={car.id} className="products">
                <ImageCarousel  imgArray={objToArray(JSON.parse(car.images))} id={car.user_id}/>
                <div className="productsInfo">
                <h1>{car.brand.name}</h1>
                <p className="productsPrice">USD${car.price}</p>
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