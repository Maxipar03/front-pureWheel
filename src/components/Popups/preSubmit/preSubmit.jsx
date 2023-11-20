import React, { useEffect, useState } from 'react'
import "./preSubmit.css";
import { Link } from 'react-router-dom';
import { fetchApi } from "../../../modules/mainModules";
import appInfo from "../../../modules/appInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function addPopup(props) {


    const closePopup = () => {
        props.setTrigger(false)
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
    return (props.trigger ?

        <div className="scp-main-choose" onClick={closePopup}>
            <div className="scp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                <div className="scp-main-div-top-color">
                    <div className="scp-close-popup-div"><p onClick={closePopup}>X</p></div>
                    <div className="scp-choose-color-input-div">
                        <button className='scp-button-color'>Submit</button>
                        <button className='scp-button-color'>Cancel</button>
                    </div>
                </div>
                <div className="scp-main-div-bottom">
                    {/* LIST OF DB COLORS FROM NEWEST TO OLDEST */}
                </div>

                <div className="scp-choose-info-div"></div>
            </div>
        </div>

        : null)

}
export default addPopup