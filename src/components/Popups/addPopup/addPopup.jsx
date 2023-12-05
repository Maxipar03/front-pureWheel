import React, { useEffect, useState } from 'react'
import "./addPopup.css";
import { Link } from 'react-router-dom';
import { fetchApi } from "../../../modules/mainModules";
import appInfo from "../../../modules/appInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function addPopup(props) {

    const [popupType, setPopupType] = useState("")
    const [allModels, setAllModels] = useState([])
    const [allColors, setAllColors] = useState([])
    const [allBrands, setAllBrands] = useState([])
    const [expandedBrands, setExpandedBrands] = useState({})
    const [selectedBrandVersion, setSelectedBrandVersion] = useState(''); // UseState Select Version
    const [selectedModelVersion, setSelectedModelVersion] = useState(''); // UseState Select Version

    // ADD/DELETE COLOR
    const [colorName, setColorName] = useState('')
    const [colorCode, setColorCode] = useState('')
    const handleColorNameChange = (e) => setColorName(e.target.value)
    const handleColorCodeChange = (e) => setColorCode(e.target.value)
    const addColorOnSubmit = () => {
        if (colorName && colorCode) {
            const permanentToken = localStorage.getItem('token');
            const token = sessionStorage.getItem('token');
            const headers = {}
            if (permanentToken) headers.Authorization = `Bearer ${permanentToken}`;
            if (token) headers.Authorization = token;
            fetchApi(`${appInfo.root}/cars/colors/create`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: colorName, code: colorCode }),
            }, (response, error) => {
                if (error) {
                    console.log("Fetch error:", error);
                } else {
                    reloadColors()
                    colorListButton();
                }
            });


        }
    }
    const deleteColorButton = (id) => {
        const permanentToken = localStorage.getItem('token');
        const token = sessionStorage.getItem('token');
        const headers = {}
        if (permanentToken) headers.Authorization = `Bearer ${permanentToken}`;
        if (token) headers.Authorization = token;
        fetchApi(`${appInfo.root}/cars/colors/delete/${id}`, {
            method: 'DELETE',
            headers,
        }, (response, error) => {
            if (error) {
                console.log("Fetch error:", error);
            } else {
                reloadColors()
            }
        });
    }

    // ADD/DELETE MODEL
    const [modelBrandId, setModelBrandId] = useState('')
    const [modelName, setModelName] = useState('')
    const handleModelBrandChange = (e) => setModelBrandId(e.target.value)
    const handleModelNameChange = (e) => setModelName(e.target.value)
    const addModelOnSubmit = () => {
        if (modelBrandId && modelName) {
            const permanentToken = localStorage.getItem('token');
            const token = sessionStorage.getItem('token');
            const headers = {}
            if (permanentToken) headers.Authorization = `Bearer ${permanentToken}`;
            if (token) headers.Authorization = token;
            fetchApi(`${appInfo.root}/cars/models/create`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: modelName,
                    brand_id: modelBrandId
                }),
            }, (response, error) => {
                if (error) {
                    console.log("Fetch error:", error);
                } else {
                    reloadBrandsModels()
                    modelListButton();
                }
            });
        }
    }
    const deleteModelButton = (id) => {
        const permanentToken = localStorage.getItem('token');
        const token = sessionStorage.getItem('token');
        const headers = {}
        if (permanentToken) headers.Authorization = `Bearer ${permanentToken}`;
        if (token) headers.Authorization = token;
        fetchApi(`${appInfo.root}/cars/models/delete/${id}`, {
            method: 'DELETE',
            headers,
        }, (response, error) => {
            if (error) {
                console.log("Fetch error:", error);
            } else {
                reloadBrandsModels()
            }
        });
    }




    // FUNCTIONS
    const toggleBrand = (brandId) => {
        setExpandedBrands((prevExpandedBrands) => ({ ...prevExpandedBrands, [brandId]: !prevExpandedBrands[brandId], }))
    }

    const closePopup = () => {
        setColorName('')
        setColorCode('')
        setModelBrandId('')
        setModelName('')
        props.setTrigger(false)
    }

    const closeListPopup = (type) => {
        setPopupType(type)
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


                const brandsArr = [];
                for (const brand of brandsResponse) {
                    const brandDetailsResponse = await fetchApi(`${appInfo.root}/cars/brands/${brand.id}`, {
                        method: 'GET',
                    }, (resolve, reject) => {
                        if (reject) console.error(reject)
                        return resolve
                    }
                    )

                    const response = {
                        brandId: brandDetailsResponse.data.id,
                        brandName: brandDetailsResponse.data.name,
                        brandLog: brandDetailsResponse.data.logo,
                        models: brandDetailsResponse.info.models,
                    };

                    brandsArr.push(response);
                }

                setAllModels(brandsArr);

                const colorsResponse = await fetchApi(`${appInfo.root}/cars/colors`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllColors(colorsResponse);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const reloadColors = async () => {
        const colorsResponse = await fetchApi(`${appInfo.root}/cars/colors`, {
            method: 'GET',
        }, (resolve, reject) => {
            if (reject) console.error(reject)
            return resolve.data
        }
        )
        setAllColors(colorsResponse);
    }
    const reloadBrandsModels = async () => {
        const brandsResponse = await fetchApi(`${appInfo.root}/cars/brands`, {
            method: 'GET',
        }, (resolve, reject) => {
            if (reject) console.error(reject)
            return resolve.data
        }
        )
        setAllBrands(brandsResponse);


        const brandsArr = [];
        for (const brand of brandsResponse) {
            const brandDetailsResponse = await fetchApi(`${appInfo.root}/cars/brands/${brand.id}`, {
                method: 'GET',
            }, (resolve, reject) => {
                if (reject) console.error(reject)
                return resolve
            }
            )

            const response = {
                brandId: brandDetailsResponse.data.id,
                brandName: brandDetailsResponse.data.name,
                brandLog: brandDetailsResponse.data.logo,
                models: brandDetailsResponse.info.models,
            };

            brandsArr.push(response);
        }

        setAllModels(brandsArr);
    }


    const colorListButton = () => setPopupType("colorList")
    const modelListButton = () => setPopupType("modelList")

    const renderFunction = (type) => {
        // COLOR DISPLAY
        if (type === "color") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top-color">
                        <div className="acp-close-popup-div"><p onClick={closePopup}>X</p></div>
                        <div className="acp-choose-color-input-div">
                            <h1 className="acp-choose-color-name-div" >Choose a color name</h1>
                            <div className="acp-main-color-input-div">
                                <input onChange={handleColorNameChange} value={colorName} className='acp-name-input-color' type="text" placeholder='Color Name' />
                                <h1 className="acp-choose-color-name-div" >Set the color</h1>
                                <input onChange={handleColorCodeChange} value={colorCode} className='acp-code-input-color' type="color" />
                            </div>
                            <button onClick={addColorOnSubmit} className='acp-button-color'>Submit</button>
                            <button onClick={colorListButton} className='acp-button-color'>Edit</button>
                        </div>
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
                                <select value={modelBrandId} onChange={handleModelBrandChange} name="" id="" className='acp-brand-input-model'>
                                    <option value="" className="SellCarHideOption">Select a brand</option>
                                    {allBrands.map((brand) => (
                                        <option key={brand.brandId} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select> {/* SHOW ALL BRANDS */}
                                <h1 className='acp-name-input-brand'>Create Model</h1>
                                <input onChange={handleModelNameChange} value={modelName} className='acp-name-input-model' type="text" placeholder='Model Name' />
                            </div>
                            <button onClick={addModelOnSubmit} className='acp-button-model'>Submit</button>
                            <button onClick={modelListButton} className='acp-button-color'>Edit</button>
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
                                <select name="" id="" className='acp-brand-input-version' value={selectedModelVersion} onChange={(e) => setSelectedModelVersion(e.target.value)} disabled={!selectedBrandVersion}>
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
        // COLOR LIST
        if (type === "colorList") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top-edit">
                        <div className="acp-close-popup-div-edit">
                            <FontAwesomeIcon icon={faArrowLeft} className='arrowExitEdit' onClick={() => { closeListPopup("color") }} />
                            <p onClick={closePopup}>X</p>
                        </div>
                        <div className="acp-choose-edit-input-div">
                            <div className='editOptionsContainer'>
                                {allColors.map((color) => (
                                    <div className='colorEditContainer' key={color.id}>
                                        <div className='colorDetailContainer'>
                                            <div className="circle" style={{ backgroundColor: `${color.code}` }}></div>
                                            <h3 className='colorEditName'>{color.name}</h3>
                                        </div>
                                        <FontAwesomeIcon onClick={() => { deleteColorButton(color.id) }} className='trashColor' icon={faTrash} />
                                    </div>
                                ))}
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
        //MODEL LIST
        if (type === "modelList") {
            return (<div className="acp-main-choose" onClick={closePopup}>
                <div className="acp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                    <div className="acp-main-div-top-edit">
                        <div className="acp-close-popup-div-edit">
                            <FontAwesomeIcon icon={faArrowLeft} className='arrowExitEdit' onClick={() => { closeListPopup("model") }} />
                            <p onClick={closePopup}>X</p>
                        </div>
                        <div className="acp-choose-edit-input-div">
                            <div className='editOptionsContainer'>
                                {allModels.map((modelBrand) => (
                                    <div key={modelBrand.brandId} className="editBrandModels">
                                        <div
                                            className={`editModelsBrandName${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                            onClick={() => { toggleBrand(modelBrand.brandId) }
                                            }
                                        >
                                            <p>{modelBrand.brandName}</p>
                                            <FontAwesomeIcon
                                                icon={expandedBrands[modelBrand.brandId] ? faAngleUp : faAngleDown}
                                                className={`arrow-icon${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                            />
                                        </div>
                                        <div className={`editModelsNames${expandedBrands[modelBrand.brandId] ? 'expanded' : 'hideOptions'}`}>
                                            {modelBrand.models
                                                ? modelBrand.models.map((modelsNames) => (
                                                    <div key={modelsNames.id} className="editModelsNameDiv" >
                                                        <p className="modelNameFilter">{modelsNames.name}</p>
                                                        <FontAwesomeIcon onClick={() => { deleteModelButton(modelsNames.id) }} className='trashColor' icon={faTrash} />
                                                    </div>
                                                ))
                                                : null}
                                        </div>
                                    </div>
                                ))}
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

    return (props.trigger) ? renderFunction(popupType) : ''
}
export default addPopup