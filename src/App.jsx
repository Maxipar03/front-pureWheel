import React, { useEffect } from "react";
import { fetchApi } from "./modules/mainModules";
import appInfo from "./modules/appInfo";
import { Routes, Route } from 'react-router-dom'
import Home from './screen/home/Home'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Loggin from './screen/login/loggin';
import Register from './screen/register/register';
import ProductsDetail from "./screen/productsDetail/productsDetail";
import BrandsProducts from "./screen/brandsProducts/brandsProducts";
import BuyCar from "./screen/buyCar/buyCar";

function App() {

  useEffect(() => {
    const permanentToken = localStorage.getItem('token');
    if (permanentToken) {
      const headers = {
        authorization: permanentToken
      };
      fetchApi(`${appInfo.root}/users/token/byId`, {
        method: 'GET',
        headers,
      },(resolve)=>{
        sessionStorage.setItem('userLogged', JSON.stringify(resolve.data))
      });
    }
  }, []);

return (
  <div className='App'>
    <Header/>
      <Routes>
        {/****************** HOME ******************/}
        <Route exact path="/" element={<Home />} />
        {/****************** USERS ******************/}
        {<Route exact path='/user/loggin' element={<Loggin/>}/>}
        {<Route exact path='/user/register' element={<Register/>}/>}
        {/****************** PRODUCTS ******************/}
        {<Route exact path='/products/brands/:id' element={<BrandsProducts/>}/>}
        {<Route exact path='/products/detail/:id' element={<ProductsDetail/>}/>}
        {<Route exact path='/products/all' element={<BuyCar/>}/>}
      </Routes>
    <Footer/>
  </div>
    
  )
}

export default App
