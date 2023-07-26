import React, { useEffect } from "react";
import { fetchApi } from "./modules/apiFetch";
import { Routes, Route } from 'react-router-dom'
import Home from './screen/home/Home'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Loggin from './screen/login/loggin';
import Register from './screen/register/register';

function App() {

  useEffect(() => {
    const permanentToken = localStorage.getItem('token');
    if (permanentToken) {
      const headers = {
        authorization: permanentToken
      };
      fetchApi('http://localhost:3001/api/users/token/byId', {
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
      </Routes>
    <Footer/>
  </div>
    
  )
}

export default App
