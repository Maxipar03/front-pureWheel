import React, { useEffect, useState } from 'react'
import "./confirmPopup.css";
import { fetchApi } from "../../../modules/mainModules";
import appInfo from "../../../modules/appInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function confirmPopup({trigger, setTrigger,carId}) {
    const closePopup = () => {
        setTrigger(false)
    }

    const deleteProduct = () => {
        const permanentToken = localStorage.getItem('token');
        const token = sessionStorage.getItem('token');
        const headers = {}
        if (permanentToken) headers.authorization = permanentToken
        if (token) headers.authorization = token
      fetchApi(`${appInfo.root}/cars/delete/${carId}`, {
        method: 'DELETE',
        headers,
      }, (resolve, reject) => {
        if (reject) {
           console.log(reject);
        } else {   
        window.location.href = '/'
          }
      })
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                closePopup()
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return trigger ? (<div className="acp-main-choose" onClick={closePopup}>
        <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
            <div className="acp-main-div-top-color">
                <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                <div className="acp-choose-color-input-div">
                    <h1 className="acp-choose-color-name-div" >This action will delete it permanently, are you sure?</h1>
                    
                    <button onClick={deleteProduct} className='acp-button-color'>DELETE</button>
                    <button onClick={closePopup} className='acp-button-color'>Cancel</button>
                </div>
            </div>
        </div>
    </div>) : null
}
export default confirmPopup