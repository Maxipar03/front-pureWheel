import React, { useEffect } from "react";
import { fetchApi } from "./modules/mainModules";
import { AnimatePresence } from "framer-motion";
import appInfo from "./modules/appInfo";
import { Routes, Route , useLocation } from 'react-router-dom'
import Home from './screen/home/Home'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Loggin from './screen/login/loggin';
import Register from './screen/register/register';
import ProductsDetail from "./screen/productsDetail/productsDetail";
import BrandsProducts from "./screen/brandsProducts/brandsProducts";
import NotFound from "./screen/NotFound/notFound"
import BuyCar from "./screen/buyCar/buyCar";
import SellCar from "./screen/SellCar/sellCar"
import Profile from "./screen/profile/profile"


function App() {
  const location = useLocation();

  const getTitleFromLocation = () => {
    switch (location.pathname) {
      case '/':
        return 'header';
      case '/user/loggin':
        return 'header';
      case '/user/register':
        return 'header';
      case '/products/detail/:id':
        return 'headerColor';
      default:
        return 'headerColor';
    }
  };

  const shouldRenderFooter = !['/user/loggin', '/user/register'].includes(location.pathname);

  const nameClass = getTitleFromLocation();

  useEffect(() => {
    const permanentToken = localStorage.getItem('token');
    if (permanentToken) {
      const headers = {
        authorization: permanentToken
      };
      fetchApi(`${appInfo.root}/users/token/byId`, {
        method:'GET',
        headers,
      },(resolve)=>{
        sessionStorage.setItem('userLogged', JSON.stringify(resolve.data))
      });
    }
  }, []);

  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'));

return (
  <div className='App'>
    <Header nameClass={nameClass}/>
    <AnimatePresence mode="wait" >
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
        {/****************** SELL CAR ******************/}
        {userLogged != null ? <Route exact path='/products/sellCar' element={userLogged.email === appInfo.adminAcces ? <SellCar/> : <><h1>ACCES DENIED</h1></>}/>:null}
        {userLogged != null ? <Route exact path='/products/update/:id' element={userLogged.email === appInfo.adminAcces ? <SellCar typeUpdate={true}/> : <><h1>ACCES DENIED</h1></>}/>:null}
        {<Route exact path="/profile" element={<Profile/>}/>}
        {<Route  path="*" element={<NotFound/>} />}
      </Routes>
      </AnimatePresence>
      {shouldRenderFooter && <Footer />}
  </div>
    
  )
}

export default App
