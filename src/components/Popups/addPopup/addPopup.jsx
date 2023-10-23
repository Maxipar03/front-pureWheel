import React, { useEffect, useState } from 'react'
import "./addPopup.css";
import { Link } from 'react-router-dom';

function addPopup(props) {
    const [popupType, setPopupType] = useState("")
    const closePopup = () => {
        props.setTrigger(false)
    }
    const none = () => {
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
    useEffect(() => {
        props.type === "color" ? setPopupType("color") : null
        props.type === "model" ? setPopupType("model") : null
        props.type === "version" ? setPopupType("version") : null
    }, [props.type])

    const renderFunction = (type) => {
        // COLOR DISPLAY
        if (type === "color") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-color-input-div">
                            <div className="acp-main-color-input-div">
                                <input className='acp-name-input-color' type="text" placeholder='Color Name' />
                                <input className='acp-code-input-color' type="color" />
                            </div>
                            <button className='acp-button-color'>Submit</button>
                        </div>
                    </div>
                    <div className="acp-main-div-bottom">
                        {/* LIST OF DB COLORS FROM NEWEST TO OLDEST */}
                    </div>

                    <div className="acp-choose-info-div"></div>
                </div>
            </div>)
        }
        // MODEL DISPLAY
        if (type === "model") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-model-input-div">
                            <div className="acp-main-model-input-div">
                                <select name="" id="" className='acp-brand-input-model'></select> {/* SHOW ALL BRANDS */}
                                <input className='acp-name-input-model' type="text" placeholder='Model Name' />
                            </div>
                            <button className='acp-button-model'>Submit</button>
                        </div>
                    </div>
                    <div className="acp-main-div-bottom">
                        {/* LIST OF DB MODELS FROM NEWEST TO OLDEST */}
                    </div>
                </div>
            </div>)
        }
        // VERSION DISPLAY
        if (type === "version") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-version-input-div">

                            <div className="acp-main-version-input-div">
                                <select name="" id="" className='acp-brand-input-version'></select>{/* SHOW ALL BRANDS */}
                                <select name="" id="" className='acp-brand-input-version'></select>{/* SHOW ALL MODELS */}
                                <input className='acp-name-input-version' type="text" placeholder='Version Name' />
                            </div>
                            <button className='acp-button-version'>Submit</button>

                        </div>
                    </div>
                    <div className="acp-main-div-bottom">
                         {/* LIST OF DB VERSIONS FROM NEWEST TO OLDEST */}
                    </div>
                </div>
            </div>)
        }
    }

    return (props.trigger) ? renderFunction(props.type) : ''
}
export default addPopup