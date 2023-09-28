import React from "react";
import './home.css'
import Banner from "../../components/banner/banner";
import Products from "../../components/products/products";
import BodyCarHome from "../../components/bodyCarHome/bodyCarHome";
import BrandsCarousel2 from "../../components/brandsCarousel2/brandsCarousel2";

function Home() {

return (
  <div className="home">
    <Banner></Banner>
    <BrandsCarousel2></BrandsCarousel2>
    <BodyCarHome></BodyCarHome>
    <Products></Products>
  </div>
  )
}

export default Home