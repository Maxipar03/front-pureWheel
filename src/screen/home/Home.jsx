import React from "react";
import './home.css'
import Banner from "../../components/banner/banner";
import BrandsCarousel from "../../components/brandsCarousel/brandsCarousel";
import Products from "../../components/products/products";

function Home() {

return (
  <div className="home">
    <Banner></Banner>
    <BrandsCarousel></BrandsCarousel>
    <Products></Products>
  </div>
  )
}

export default Home