import React from "react";
import './home.css'
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import BrandsCarousel from "../../components/brandsCarousel/brandsCarousel";
import Products from "../../components/products/products";

function Home() {

return (
  <div className="home">
    <Header></Header>
    <Banner></Banner>
    <BrandsCarousel></BrandsCarousel>
    <Products></Products>
    <Footer></Footer>
  </div>
  )
}

export default Home