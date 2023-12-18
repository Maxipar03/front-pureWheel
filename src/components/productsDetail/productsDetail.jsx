import React, { useState, useEffect } from "react";
import "./productsDetail.css";
import { fetchApi } from "../../modules/mainModules";
import { useParams } from "react-router-dom";
import appInfo from "../../modules/appInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ImgCarruselDetail from "../imgCarrouselDetail/imgCarrouselDetail"
import ProductDetailRelated from "../proudctDetailRelated/productDetailRelated";
import ConfirmPopup from "../Popups/confirmPopup/confirmPopup";
import { FadeLoader } from "react-spinners";


function productsDetail() {
  // States
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productRelated, setProductRelated] = useState([])
  const [moreInfo, setMoreInfo] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const [confPop, setConfPop] = useState(false)
  const [loading, setLoading] = useState(true)
  const[loadingRelated,setLoadingRelated] = useState(true)

  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))
  // Effects
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
          setProduct(resolve.data);
          setLoading(false)
        }
      }
    );
  }, []);
  useEffect(() => {
    fetchApi(`${appInfo.root}/cars`, {
      method: 'GET',
    }, (resolve, reject) => {
      if (reject) {
        console.log(reject);
      } else {
        setProductRelated(resolve.data)
        setLoadingRelated(false)
      }
    });
  }, []);

  const handleClickFav = (carID) => {
    let existingData = JSON.parse(localStorage.getItem("favorites"));
    if (existingData === null || existingData === null) { // ini
      localStorage.setItem("favorites", JSON.stringify([product]));
      setIsFav(true)
    } else {
      const isIn = existingData.filter(element => element.id == carID)

      if (isIn.length > 0) {
        const newArr = existingData.map(element => element.id != carID ? element : null)
        localStorage.setItem("favorites", JSON.stringify(newArr.filter(element => element != null)));
      setIsFav(false)
      } else {
        existingData.push(product)
        localStorage.setItem("favorites", JSON.stringify(existingData));
      setIsFav(true)
      }
    }
  }

  useEffect(() => {
    let existingData = JSON.parse(localStorage.getItem("favorites"));
    if(existingData != null){
    const isIn = existingData.filter(element => element.id == product.id)
    if (isIn.length > 0) {
      setIsFav(true)
    }else{
      setIsFav(false)
    }}

  },[])

  // Functions

  function calculateDiscountedPrice(price, discountPercentage) {
    const discountedPrice = price - (price * (discountPercentage / 100));
    return discountedPrice.toFixed(0);
  }

  function objToArray(obj) {
    const imagesToArray = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        imagesToArray.push(obj[key]);
      }
    }
    return imagesToArray;
  }

  
  const productRelatedBrand = productRelated.filter((car) => car.brand.name === product.brand.name) ;
  const editButonHandle = () => {
    window.location.href = `/products/update/${id}`
  }

  const deleteButtonHandle = () => { 
    setConfPop(true)
  }

  return (
    <div className="allProductDetailContainer">
      {loading ?  (
    <div className="skeletonContainer">
      <FadeLoader  color="#a8b7b4"
  margin={0} />
      <p className="loadingText">Loading...</p>
  </div>

            ) : (
      <>
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
              {product.model && product.model.name }
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
              <h3>{product.color && product.color.name}</h3>
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
            {product.onSale ?
              <div className="productDetailPrice">
                <h2>${calculateDiscountedPrice(product.price, product.onSale)}</h2>
                <h2 id="productPriceOldDetail"><span className="line-throw-detail">{product.price}</span></h2>
              </div> :
              <div className="productDetailPrice">
                <h2>${product.price}</h2>
              </div>
            }
          </div>
          {/* BUTTONS LOGIC */}
          {(userLogged ? userLogged.id : null) === product.user_id ?
            <><div className="productDetailButtonEditcontainer">
              <div className="productDetailButtonEdit">
                <button onClick={() => { editButonHandle() }} className="editButton"><FontAwesomeIcon icon={faPen} />Edit Product</button>
              </div>
            </div>
              <div className="productDetailButtonFavcontainer">
                <div className="productDetailButtonFav">
                  <button onClick={() => { deleteButtonHandle() }} className="favButton"><FontAwesomeIcon icon={faTrash} />Delete Product</button>
                </div>
              </div></> :
            <><div className="productDetailButtonWpcontainer">
              <div className="productDetailButtonWp">
                <button className="whatsappButton"><FontAwesomeIcon icon={faWhatsapp} />Send Message</button>
              </div>
            </div>
              <div className="productDetailButtonFavcontainer">
                <div className="productDetailButtonFav">
                  {isFav ? 
                  <button className="favButton" onClick={() => handleClickFav(product.id)}><FontAwesomeIcon icon={solidHeart} />Quit favorites</button> :
                  <button className="favButton" onClick={() => handleClickFav(product.id)}><FontAwesomeIcon icon={regularHeart} /> Add to favorites</button> 
                }
                </div>
              </div></>}
        </div>
      </div>
      <div className="productDetailMoreInfoContainer">
        <div className="productDetailMoreInfoRow">
          <div className="productDetailMoreInfoBox">
            <div className="productDetailMoreInfoDiv">
              {product.bodyCar === null ? <h1>-</h1> : <h1>{product.bodyCar && product.bodyCar.name}</h1>}
            </div>
            <div className="productDetailMoreInfoDiv">
              {product.transmission === null ? <h1>-</h1> : <h1>{product.transmission}</h1>}
            </div>
            <div className="productDetailMoreInfoDiv">
              {product.gas === null ? <h1>-</h1> : <h1>{product.gas}</h1>}
            </div>
          </div>
          {!moreInfo ?
            <div className="productDetailMoreInfoOpen">
              <h1 className="productDetailMoreInfoOpentxt" onClick={() => { setMoreInfo(true) }} >See More</h1>
              <FontAwesomeIcon icon={faAngleDown} className="arrowMoreInfo" />
            </div> : null
          }
        </div>
        {moreInfo ?
          <div className="productDetailMoreInfoRow">
            <div className="productDetailMoreInfoBox">
              <div className="productDetailMoreInfoDiv">
                {product.engine === null ? <h1>-</h1> : <h1>{product.engine}</h1>}
              </div>
              <div className="productDetailMoreInfoDiv">
                {product.version === null ? <h1>{product.version}</h1> : <h1>No have version</h1>}
              </div>
              <div className="productDetailMoreInfoDiv">
                {product.doors === null ? <h1>-</h1> : <h1>{product.doors}</h1>}
              </div>
            </div>
            {moreInfo ?
              <div className="productDetailMoreInfoOpen">
                <h1 className="productDetailMoreInfoOpentxt" onClick={() => { setMoreInfo(false) }} >See Less</h1>
                <FontAwesomeIcon icon={faAngleUp} className="arrowMoreInfo" />
              </div> : null
            }
          </div> : null
        }

      </div>
        </>
        )}
      <div className="productRelatedTitleContainer">
        <h1 className="productRelatedTitle">Product Related</h1>
      </div>
      {loadingRelated ? (
        (
          <div className="skeletonContainer">
            <FadeLoader  color="#a8b7b4"
        margin={0} />
            <p className="loadingText">Loading...</p>
        </div>
      
                  )
      ) : (   
       <div className="productRelatedContainer">
        {productRelatedBrand ? productRelatedBrand.map((car) => (
          <div key={car.id}>
          <ProductDetailRelated productDescriptionClass={"productDescriptionContainer"} productArticleClass={"productsArticle"} carsImage={car.images} CarsID={car.id} carsUserID={car.user_id} carsModelName={car.model.name} carsPrice={car.price} carsKM={car.km} carsYear={car.year} />
          </div>
          )) : null}
          </div>
          )}
          <ConfirmPopup carId={id} trigger={confPop} setTrigger={setConfPop} />
    </div>
  );
}

export default productsDetail;
