import React, { useEffect, useState } from 'react'
import "./addColor.css";
import { Link } from 'react-router-dom';

function addColor(props) {

    const [popupType, setPopupType] = useState("")

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



    useEffect(() => {
        props.type === "color" ? setPopupType("color") : null
        props.type === "model" ? setPopupType("model") : null
        props.type === "version" ? setPopupType("version") : null
    }, [props.type])

    const renderFunction = (type) => {
        if (type === "color") {
            return (<div className="acp-main-choose">
                <div className="acp-choose-main-div">
                    <div className='close-popup'><i onClick={closePopup} className="fa-solid fa-xmark"></i></div>
                    <input
                        type="color"
                        id="sellCarInput"
                    />

                </div>
            </div>)
        }
        // if (type === "model") {
        //     return (<div className="acp-main-choose">
        //     <div className="acp-choose-main-div">
        //         <div className='close-popup'><i onClick={closePopup} className="fa-solid fa-xmark"></i></div>
        //        <p>MODEL</p>

        //     </div>
        // </div>)
        // }
        // if (type === "version") {
        //     return (<div className="acp-main-choose">
        //     <div className="acp-choose-main-div">
        //         <div className='close-popup'><i onClick={closePopup} className="fa-solid fa-xmark"></i></div>
        //         <p>VERSION</p>


        //     </div>
        // </div>)
        // }
    }

    return (props.trigger) ? renderFunction(props.type) : ''
}
export default addColor