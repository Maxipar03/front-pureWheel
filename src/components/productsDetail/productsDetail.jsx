import React, { useState, useEffect } from "react";
import "./productsDetail.css";
import { fetchApi } from "../../modules/mainModules";
import { useParams } from "react-router-dom";
import appInfo from "../../modules/appInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ImgCarruselDetail from "../imgCarrouselDetail/imgCarrouselDetail"
import ProductDetailRelated from "../proudctDetailRelated/productDetailRelated";


function productsDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productRelated, setProductRelated] = useState([])

  useEffect(() => {
    fetchApi(
      `${appInfo.root}/cars/${id}`,
      {
        method: "GET",
      },
      (resolve, reject) => {
        if (reject) {
          console.log(reject);
        } else {
          console.log(resolve);
          setProduct(resolve.data);
        }
      }
    );
  }, []);

  console.log(product);

  useEffect(() => {
    fetchApi(`${appInfo.root}/cars`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.log(reject);
      } else {
        console.log(resolve)
        setProductRelated(resolve.data)
        console.log(brandProducts)
      }
    });
  }, []);

  function objToArray(obj) {
    const imagesToArray = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        imagesToArray.push(obj[key]);
      }
    }
    return imagesToArray;
  }

  const productRelatedBrand = productRelated.filter((car) => car.brand.name === product.brand.name);

  return (
    <div className="allProductDetailContainer">
    <div className="productDetail">
      {product.images && (
        <ImgCarruselDetail
          imgArray={objToArray(JSON.parse(product.images))}
          id={product.user_id}
          productImgClassName={"productsImageDetail"}
          nextButtonClassName={"nextButtonDetail"}
          prevButtonClassName={"prevButtonDetail"}
        />
      )}
      <div className="productDetailContainer">
        <div className="productDetailInfoName">
          <h3 className="productDetailBrand">
            {product.brand && product.brand.name}
          </h3>
          <h3 className="productDetailModel">
            {product.model && product.model.name}
          </h3>
        </div>
        <div className="productDetailLineContainer">
          <div className="productDetailInfo">
            <h2>Year</h2>
            <h3>{product.year}</h3>
          </div>
          <div className="productDetailInfo">
            <h2>Damage</h2>
            {product.damage === null ? <h3>Has no crash</h3> : <h2>{product.damage}</h2>}
          </div>
        </div>
        <div className="productDetailLineContainer">
          <div className="productDetailInfo">
            <h2>Color</h2>
            <h3>{product.color}</h3>
          </div>
          <div className="productDetailInfo">
            <h2>Kilometres</h2>
            <h3>{product.km}</h3>
          </div>
        </div>
        <div className="productDetailDescriptionContainer">
          <div className="productDetailDescription">
            <h2>Description</h2>
            <h3>{product.description}</h3>
          </div>
        </div>
        <div className="productDetailPriceContainer">
          <div className="productDetailPrice">
            <h2>${product.price}</h2>
          </div>
        </div>
        <div className="productDetailButtonWpcontainer">
          <div className="productDetailButtonWp">
          <button className="whatsappButton"><FontAwesomeIcon id="whatsappIcon"icon={faMessage} /> Send Message</button>
          </div>
        </div>
        <div className="productDetailButtonFavcontainer">
          <div className="productDetailButtonFav">
          <button className="favButton"><FontAwesomeIcon icon={faHeart} /> Add to favorites</button>
          </div>
        </div>
      </div>
    </div>
    <div className="productRelatedTitleContainer">
    <h1 className="productRelatedTitle">Product Related</h1>
    </div>
    <div className="productRelatedContainer"> 
      {productRelatedBrand.map((car) => (
        <div key={car.id}>
            <ProductDetailRelated productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={car.images} CarsID={car.id} carsUserID={car.user_id} carsModelName={car.model.name} carsPrice={car.price} carsKM={car.km} carsYear={car.year}/>
        </div>
      ))}
    </div>
    </div> 
  );
}

export default productsDetail;
