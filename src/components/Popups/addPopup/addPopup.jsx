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
                    <div className="acp-choose-color-input-div">
                        <input type="text"/>
                        <input type="color" />
                    </div>
                    <div className="acp-choose-info-div"></div>
                </div>
            </div>)
        }
        // MODEL DISPLAY
        if (type === "model") {
            return (<div className="acp-main-choose" onClick={closePopup}>
            <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
               <p>MODEL</p>
            </div>
        </div>)
        }
        // VERSION DISPLAY
        if (type === "version") {
            return (<div className="acp-main-choose" onClick={closePopup}>
            <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                <p>VERSION</p>
            </div>
        </div>)
        }
    }

    return (props.trigger) ? renderFunction(props.type) : ''
}
export default addPopup