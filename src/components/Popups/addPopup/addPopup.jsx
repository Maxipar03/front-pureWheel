import React, { useEffect, useState } from 'react'
import "./addPopup.css";
import { Link } from 'react-router-dom';
import { fetchApi } from "../../../modules/mainModules";
import appInfo from "../../../modules/appInfo"

function addPopup(props) {

    const [popupType, setPopupType] = useState("")
    const [allModels,setAllModels] = useState([])
    const [allBrands,setAllBrands] = useState([])
    const [selectedBrandVersion, setSelectedBrandVersion] = useState(''); // UseState Select Version
    const [selectedModelVersion, setSelectedModelVersion] = useState(''); // UseState Select Version

    const closePopup = () => {
        props.setTrigger(false)
    }
    const none = () => {
    }

    const handleBrandChangeVersion = (e) => {
        const selectedBrandId = e.target.value;
        setSelectedBrandVersion(selectedBrandId);
        setSelectedModelVersion('');
        setSelectedModelVersion(allModels.filter((model) => model.brand_id === selectedBrandId));
    };


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

    useEffect(() => {
        const fetchData = async () => {
            try {

                const brandsResponse = await fetchApi(`${appInfo.root}/cars/brands`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllBrands(brandsResponse);

                const modelsResponse = await fetchApi(`${appInfo.root}/cars/models`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllModels(modelsResponse);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const renderFunction = (type) => {
        // COLOR DISPLAY
        if (type === "color") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top-color">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-color-input-div">
                            <h1 className="acp-choose-color-name-div" >Choose color</h1>
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
                    <div className="acp-main-div-top-model">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-model-input-div">
                            <div className="acp-main-model-input-div">
                                <h1 className='acp-name-input-brand'>Select Brand</h1>
                                <select name="" id="" className='acp-brand-input-model'>
                                <option value="" className="SellCarHideOption">Select a brand</option>
                            {allBrands.map((brand) => (
                                <option key={brand.brandId} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                                    </select> {/* SHOW ALL BRANDS */}
                                <h1 className='acp-name-input-brand'>Create Model</h1>
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
                    <div className="acp-main-div-top-version">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-version-input-div">

                            <div className="acp-main-version-input-div">
                                <h1 className='acp-name-input-brand' >Select Brand</h1>
                                <select name="" id="" className='acp-brand-input-version' value={selectedBrandVersion} onChange={handleBrandChangeVersion}>
                                <option value="" className="SellCarHideOption">Select Brand</option>
                            {allBrands.map((brand) => (
                                <option key={brand.brandId} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                                    </select>{/* SHOW ALL BRANDS */}
                                <h1 className='acp-name-input-brand'>Select Model</h1>
                                <select name="" id="" className='acp-brand-input-version'  value={selectedModelVersion} onChange={(e) => setSelectedModelVersion(e.target.value)} disabled={!selectedBrandVersion}>
                                <option value="" className="SellCarHideOption">Select Model</option>
                                {selectedBrandVersion &&
                                allModels
                                    .filter((model) => model.brand_id == selectedBrandVersion)
                                    .map((model) => (
                                        <option key={model.id} value={model.name}>
                                            {model.name}
                                        </option>
                                    ))}
                                    </select>{/* SHOW ALL MODELS */}
                                <h1 className='acp-name-input-brand'>Create Version</h1>
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