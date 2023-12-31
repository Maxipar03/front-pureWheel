import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import './sellCarBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { fetchApi, addValueToArray, removeImage, removeNewImage } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo"
import AddPopup from '../Popups/addPopup/addPopup.jsx'
import PreSubmit from '../Popups/preSubmit/preSubmit.jsx'
import ErrorBlock from '../errors/errorBlock/errorBlock.jsx'


function sellCarBlock(props) {

    const { id } = useParams()

    const [isSticky, setIsSticky] = useState(false);
    // Sell
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedColor, setSelectedColor] = useState();
    const [selectedBrand, setSelectedBrand] = useState();
    const [selectedModel, setSelectedModel] = useState();
    const [selectedBodyCar, setSelectedBodyCar] = useState();
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedPrice, setSelectedPrice] = useState()
    const [selectedDescription, setSelectedDescription] = useState('')
    const [selectedDiscount, setSelectedDiscount] = useState()
    const [selectedKilometers, setSelectedKilometers] = useState()
    const [selectedYear, setSelectedYear] = useState()
    const [selectedVersion, setSelectedVersion] = useState()
    const [selectedDamage, setSelectedDamage] = useState('')
    const [selectedGasoline, setSelectedGasoline] = useState('')
    const [selectedEngine, setSelectedEngine] = useState('')
    // Update
    const [oldImages, setOldImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [removeImages, setRemoveImages] = useState([]);

    const [updateCarInfo, setUpdateCarInfo] = useState({})



    // ErrorsStatus
    const [fullError, setFullError] = useState(false)
    const [errorStatusImages, setErrorStatusImages] = useState(false)
    const [errorMsgImages, setErrorMsgImages] = useState('')
    const [errorStatusColor, setErrorStatusColor] = useState(false)
    const [errorMsgColor, setErrorMsgColor] = useState('')
    const [errorStatusBrand, setErrorStatusBrand] = useState(false)
    const [errorMsgBrand, setErrorMsgBrand] = useState('')
    const [errorStatusModel, setErrorStatusModel] = useState(false)
    const [errorMsgModel, setErrorMsgModel] = useState('')
    const [errorStatusBody, setErrorStatusBody] = useState(false)
    const [errorMsgBody, setErrorMsgBody] = useState('')
    const [errorStatusTransmission, setErrorStatusTransmission] = useState(false)
    const [errorMsgTransmission, setErrorMsgTransmission] = useState('')
    const [errorStatusPrice, setErrorStatusPrice] = useState(false)
    const [errorMsgPrice, setErrorMsgPrice] = useState('')
    const [errorStatusDescription, setErrorStatusDescription] = useState(false)
    const [errorMsgDescription, setErrorMsgDescription] = useState('')
    const [errorStatusDiscount, setErrorStatusDiscount] = useState(false)
    const [errorMsgDiscount, setErrorMsgDiscount] = useState('')
    const [errorStatusKilometers, setErrorStatusKilometers] = useState(false)
    const [errorMsgKilometers, setErrorMsgKilometers] = useState('')
    const [errorStatusYear, setErrorStatusYear] = useState(false)
    const [errorMsgYear, setErrorMsgYear] = useState('')
    const [errorStatusVersion, setErrorStatusVersion] = useState(false)
    const [errorMsgVersion, setErrorMsgVersion] = useState('')
    const [errorStatusDamage, setErrorStatusDamage] = useState(false)
    const [errorMsgDamage, setErrorMsgDamage] = useState('')
    const [errorStatusGasoline, setErrorStatusGasoline] = useState(false)
    const [errorMsgGasoline, setErrorMsgGasoline] = useState('')
    const [errorStatusEngine, setErrorStatusEngine] = useState(false)
    const [errorMsgEngine, setErrorMsgEngine] = useState('')

    // APIs DATA
    const [allBrands, setAllBrands] = useState([]);
    const [allModels, setAllModels] = useState([]);
    const [allBodyCars, setAllBodyCars] = useState([])
    const [allColors, setAllColors] = useState([])
    const [allVersions, setAllVersions] = useState([])

    // REFS
    const refErrorImg = useRef()
    const refInputImg = useRef()
    const refImageIcon = useRef()

    // POPUP STATUS
    const [addPopupType, setAddPopupType] = useState("")
    const [addPopup, setAddPopup] = useState(false);
    const [preSubmit, setPreSubmit] = useState(false)

    // PRE-SELL DATA
    const [sellCarData, setSellCarData] = useState({})

    const addPopupFunction = (type) => {
        if (!addPopup) setAddPopup(true)
        if (addPopup) setAddPopup(false)
        type === "color" ? setAddPopupType("color") : null
        type === "model" ? setAddPopupType("model") : null
        type === "version" ? setAddPopupType("version") : null
    }

    // FUNCTIONS
    // HANDLERS 
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
        const validatedImages = [];

        files.forEach((file) => {
            if (allowedExtensions.test(file.name)) {
                validatedImages.push(file);
            } else {
                refErrorImg.current.className = 'ch-error-shown'
                setTimeout(() => {
                    refErrorImg.current.className = 'ch-error-hidden'
                }, 2000);
            }
        });
        refInputImg.current.className = 'imageC'
        refImageIcon.current.className = 'ch-add-img-icon fa-solid fa-circle-plus'
        setSelectedImages([...selectedImages, ...validatedImages]);
        const newFiles = [...selectedImages, ...validatedImages]
        setNewImages([...newImages, ...validatedImages]);

        if (newFiles.length > 0) {
            setErrorStatusImages(false)
        }
    };
    const handleColorChange = (e) => {
        const newColor = e.target.value
        setSelectedColor(newColor)
        setErrorStatusColor(false)
    }
    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.value;
        setSelectedBrand(selectedBrandId);
        setSelectedModel('');
        setSelectedModel(allModels.filter((model) => model.brand_id === selectedBrandId));
        setErrorStatusBrand(false)
    };
    const handleModelChange = (e) => {
        const newModel = e.target.value
        setSelectedModel(newModel)
        setErrorStatusModel(false)
    }
    const handleBodyCarChange = (e) => {
        const newBody = e.target.value
        setSelectedBodyCar(newBody)
        setErrorStatusBody(false)
    }
    const handleTransmissionChange = (e) => {
        const newTransmission = e.target.value
        setSelectedTransmission(newTransmission)
        setErrorStatusTransmission(false)
    }
    const handlePriceChange = (e) => {
        const newPrice = e.target.value
        setSelectedPrice(newPrice)
        setErrorStatusPrice(false)
    }
    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value
        setSelectedDescription(newDescription)
        setErrorStatusDescription(false)
    }
    const handleDiscountChange = (e) => {
        const newDiscount = e.target.value
        setSelectedDiscount(newDiscount)
        setErrorStatusDiscount(false)
    }
    const handleKilometersChange = (e) => {
        const newKilometers = e.target.value
        setSelectedKilometers(newKilometers)
        setErrorStatusKilometers(false)
    }
    const handleYearChange = (e) => {
        const newYear = e.target.value
        setSelectedYear(newYear)
        setErrorStatusYear(false)
    }
    const handleVersionChange = (e) => {
        const newVersion = e.target.value
        setSelectedVersion(newVersion)
        setErrorStatusVersion(false)
    }
    const handleDamageChange = (e) => {
        const newDamage = e.target.value
        setSelectedDamage(newDamage)
        setErrorStatusDamage(false)
    }
    const handleGasolineChange = (e) => {
        const newGasoline = e.target.value
        setSelectedGasoline(newGasoline)
        setErrorStatusGasoline(false)
    }
    const handleEngineChange = (e) => {
        const newEngine = e.target.value
        setSelectedEngine(newEngine)
        setErrorStatusEngine(false)
    }
    // OnClickSubmit
    const sellCarButtonClick = () => {
        const data = {
            Images: selectedImages,
            Color: selectedColor,
            Brand: selectedBrand,
            Model: selectedModel,
            Body: selectedBodyCar,
            Transmission: selectedTransmission,
            Price: selectedPrice,
            Description: selectedDescription,
            Discount: selectedDiscount,
            Kilometers: selectedKilometers,
            Year: selectedYear,
            Version: selectedVersion,
            Damage: selectedDamage,
            Gasoline: selectedGasoline,
            Engine: selectedEngine,
            User_id: updateCarInfo.user_id,
            oldImages,
            newImages,
            removeImages
        }

        let errArr = []

        // Images
        if (props.typeUpdate) {
            if (oldImages.length === 0 && newImages.length === 0) {
                addValueToArray(errArr, 'Images')
            } else {
                errArr = errArr.filter(e => e != 'Images')
                setErrorStatusImages(false)
            }
        } else {
            if (data.Images.length < 1) {
                addValueToArray(errArr, 'Images')
                setErrorStatusImages(true)
            } else {
                errArr = errArr.filter(e => e != 'Images')
                setErrorStatusImages(false)
            } 
        }
        // Description
        if (!data.Description) {
            addValueToArray(errArr, 'Description')
            setErrorStatusDescription(true)
        } else {
            errArr = errArr.filter(e => e != 'Description')
            setErrorStatusDescription(false)
        }
        // Color
        if (!data.Color) {
            addValueToArray(errArr, 'Color')
            setErrorStatusColor(true)
        } else {
            errArr = errArr.filter(e => e != 'Color')
            setErrorStatusColor(false)
        }
        // Brand
        if (!data.Brand) {
            addValueToArray(errArr, 'Brand')
            setErrorStatusBrand(true)
        } else {
            errArr = errArr.filter(e => e != 'Brand')
            setErrorStatusBrand(false)
        }
        // Model
        if (!data.Model) {
            addValueToArray(errArr, 'Model')
            setErrorStatusModel(true)
        } else {
            errArr = errArr.filter(e => e != 'Model')
            setErrorStatusModel(false)
        }
        // Body
        if (!data.Body) {
            addValueToArray(errArr, 'Body')
            setErrorStatusBody(true)
        } else {
            errArr = errArr.filter(e => e != 'Body')
            setErrorStatusBody(false)
        }
        // Transmission
        if (!data.Transmission) {
            addValueToArray(errArr, 'Transmission')
            setErrorStatusTransmission(true)
        } else {
            errArr = errArr.filter(e => e != 'Transmission')
            setErrorStatusTransmission(false)
        }
        // Price
        if (!data.Price) {
            addValueToArray(errArr, 'Price')
            setErrorStatusPrice(true)
        } else {
            errArr = errArr.filter(e => e != 'Price')
            setErrorStatusPrice(false)
        }
        // Kilometers
        if (!data.Kilometers) {
            addValueToArray(errArr, 'Kilometers')
            setErrorStatusKilometers(true)
        } else {
            errArr = errArr.filter(e => e != 'Kilometers')
            setErrorStatusKilometers(false)
        }
        // Year
        if (!data.Year) {
            addValueToArray(errArr, 'Year')
            setErrorStatusYear(true)
        } else {
            errArr = errArr.filter(e => e != 'Year')
            setErrorStatusYear(false)
        }
        // Version
        if (!data.Version) {
            addValueToArray(errArr, 'Version')
            setErrorStatusVersion(true)
        } else {
            errArr = errArr.filter(e => e != 'Version')
            setErrorStatusVersion(false)
        }
        // Gasoline
        if (!data.Gasoline) {
            addValueToArray(errArr, 'Gasoline')
            setErrorStatusGasoline(true)
        } else {
            errArr = errArr.filter(e => e != 'Gasoline')
            setErrorStatusGasoline(false)
        }
        // Engine
        if (!data.Engine) {
            addValueToArray(errArr, 'Engine')
            setErrorStatusEngine(true)
        } else {
            errArr = errArr.filter(e => e != 'Engine')
            setErrorStatusEngine(false)
        }

        if (errArr.length > 0) {
            setFullError(true)
        } else {
            setFullError(false)
            setSellCarData(data)
            setPreSubmit(true)
        }
    }


    const cleanForm = () => {
        selectedImages ? setSelectedImages([]) : null
        oldImages ? setOldImages([]) : null
        newImages ? setNewImages([]) : null
        removeImages ? setRemoveImages([]) : null
        setSelectedColor('')
        setSelectedBrand('')
        setSelectedModel('')
        setSelectedBodyCar('')
        setSelectedTransmission('')
        setSelectedPrice('')
        setSelectedDescription('')
        setSelectedDiscount('')
        setSelectedKilometers('')
        setSelectedYear('')
        setSelectedVersion('')
        setSelectedDamage('')
        setSelectedGasoline('')
        setSelectedEngine('')
    }

    const removeImg = (index, event) => {
        event.preventDefault()
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

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

                const bodyCarsResponse = await fetchApi(`${appInfo.root}/cars/chassis`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllBodyCars(bodyCarsResponse);

                const modelsResponse = await fetchApi(`${appInfo.root}/cars/models`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllModels(modelsResponse);

                const colorsResponse = await fetchApi(`${appInfo.root}/cars/colors`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllColors(colorsResponse);

                const versionResponse = await fetchApi(`${appInfo.root}/cars/versions`, {
                    method: 'GET',
                }, (resolve, reject) => {
                    if (reject) console.error(reject)
                    return resolve.data
                }
                )
                setAllVersions(versionResponse);

                if (props.typeUpdate) {
                    const carResponse = await fetchApi(`${appInfo.root}/cars/${id}`, {
                        method: 'GET',
                    }, (resolve, reject) => {
                        if (reject) console.error(reject)
                        return resolve.data
                    })
                    setUpdateCarInfo(carResponse)
                    setOldImages(JSON.parse(carResponse.images))
                    setSelectedColor(carResponse.color_id)
                    setSelectedBrand(carResponse.brand_id)
                    setSelectedModel(carResponse.carModel_id)
                    setSelectedBodyCar(carResponse.bodyCar_id)
                    setSelectedTransmission(carResponse.transmission)
                    setSelectedPrice(carResponse.price)
                    setSelectedDescription(carResponse.description)
                    setSelectedDiscount(carResponse.onSale)
                    setSelectedKilometers(carResponse.km)
                    setSelectedYear(carResponse.year)
                    setSelectedVersion(carResponse.version_id)
                    setSelectedDamage(carResponse.damage)
                    setSelectedGasoline(carResponse.gas)
                    setSelectedEngine(carResponse.engine)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleScroll = () => {
        const windowHeight = window.innerHeight + 95;
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= pageHeight) {
            // Si el desplazamiento está en la parte inferior de la página, activamos el modo pegajoso.
            setIsSticky(true);
        } else {
            // De lo contrario, desactivamos el modo pegajoso.
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div>
            <div className="sellCarImageContainerTitle">
                <h3 className="sellCarImageTitle">Upload your images car</h3>
                <div className="sellCarImageContainer">
                    <label htmlFor="sellCarInputImage" className={errorStatusImages ? "file-upload-label-error" : "file-upload-label"}>
                        <i className="fa-solid fa-plus"><FontAwesomeIcon icon={faImages} /></i>
                        <p className="sellCarUploadTitle">Upload Images</p>
                    </label>
                    <input type="file" id="sellCarInputImage" name="productFile" multiple onChange={handleImageChange} className="file-upload-input" />
                    <h5 ref={refErrorImg} className='sellCarImageError'>File extension not allowed</h5>
                    {/****************************** IMAGE ******************************/}
                    <div ref={refInputImg} className="imageC">
                        {/* |||||||||||||||||||||||||||||||||||||||SELL CAR CASE||||||||||||||||||||||||||||||||||||||||||||| */}
                        {!props.typeUpdate ? selectedImages.map((image, index) => (
                            <div key={index} className="sellCarImagePreview">
                                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                                <a onClick={(event) => removeImg(index, event)}><i className="sellCarXmark"><FontAwesomeIcon icon={faX} /></i></a>
                            </div>
                        )) : null}

                        {/* |||||||||||||||||||||||||||||||||||UDATE CAR CASE||||||||||||||||||||||||||||||||||||||||||||||||||||| */}
                        {props.typeUpdate ? (oldImages.length > 0 ? oldImages.map((image, index) => (
                            <div key={index} className="sellCarImagePreview">
                                <img src={`${appInfo.root}/images/cars/user_${updateCarInfo.user_id}/${image}`} alt={`Image ${index}`} />
                                <a onClick={(event) => removeImage(index, event, removeImages, setRemoveImages, oldImages, setOldImages)}><i className="sellCarXmark"><FontAwesomeIcon icon={faX} /></i></a>
                            </div>
                        )) : null) : null}
                        {props.typeUpdate ? (newImages.length > 0 ? newImages.map((image, index) => (
                            <div key={index} className="sellCarImagePreview">
                                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                                <a onClick={(event) => removeNewImage(index, event, newImages, setNewImages)}><i className="sellCarXmark"><FontAwesomeIcon icon={faX} /></i></a>
                            </div>
                        )) : null) : null}
                        {/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */}


                        <label><i ref={refImageIcon} className="addImageIcon"></i></label>
                    </div>
                    {/*******************************************************************/}
                </div>
            </div>
            <div className="flexRow">
                <div className="rowOne">
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Description*</label>
                        <input value={selectedDescription} id={errorStatusDescription ? "sellCarInputError" : "sellCarInput"} placeholder="Porsche cayane 3.8gt" type="text" onChange={(e) => handleDescriptionChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer" className="sellCarPriceInputContainer" >
                        <label id="sellCarLabel">Price*</label>
                        <input value={selectedPrice} id={errorStatusPrice ? "sellCarInputError" : "sellCarInput"} placeholder="20000" type="number" inputMode="numeric" onChange={(e) => handlePriceChange(e)}></input> {/*INPUT*/}
                        <p className="sellCarPriceIcon">$</p>
                    </div>
                    <div id="sellCarInputContainer" className="sellCarDiscountInputContainer">
                        <label id="sellCarLabel">Discount</label>
                        <input value={selectedDiscount} id={errorStatusDiscount ? "sellCarInputError" : "sellCarInput"} placeholder="20" type="number" onChange={(e) => handleDiscountChange(e)}></input> {/*INPUT*/}
                        <p className="sellCarDiscountIcon">%</p>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Kilometers*</label>
                        <input value={selectedKilometers} id={errorStatusKilometers ? "sellCarInputError" : "sellCarInput"} placeholder="1000" type="number" onChange={(e) => handleKilometersChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Year*</label>
                        <input value={selectedYear} id={errorStatusYear ? "sellCarInputError" : "sellCarInput"} placeholder="2021" type="number" onChange={(e) => handleYearChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Color*</label>
                        <select id={errorStatusColor ? "sellCarSelectError" : "sellCarSelect"} value={selectedColor} onChange={(e) => handleColorChange(e)}>
                            <option value="" className="SellCarHideOption">Select a color</option>
                            {allColors.map(color => (
                                <option key={color.id} value={color.id}>{color.name}</option>
                            ))}
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Damage</label>
                        <input value={selectedDamage} type="text" id="sellCarSelect" placeholder="Front Crash" onChange={(e) => handleDamageChange(e)}></input> {/*INPUT*/}

                    </div>
                </div>
                <div className="rowTwo">
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Brand*</label>
                        <select id={errorStatusBrand ? "sellCarSelectError" : "sellCarSelect"} value={selectedBrand} onChange={handleBrandChange}>
                            <option value="" className="SellCarHideOption">Select a brand</option>
                            {allBrands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Model*</label>
                        <select id={errorStatusModel ? "sellCarSelectError" : "sellCarSelect"} value={selectedModel} onChange={(e) => handleModelChange(e)} disabled={!selectedBrand}>
                            <option value="" className="SellCarHideOption">Select a model</option>
                            {selectedBrand &&
                                allModels
                                    .filter((model) => model.brand_id == selectedBrand)
                                    .map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Transmission*</label>
                        <select id={errorStatusTransmission ? "sellCarSelectError" : "sellCarSelect"} value={selectedTransmission} onChange={(e) => handleTransmissionChange(e)}>
                            <option value="" className="SellCarHideOption">Select a transmission</option>
                            <option>Manual</option>
                            <option>Automatic</option>
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Version</label>
                        <select id={errorStatusVersion ? "sellCarSelectError" : "sellCarSelect"} value={selectedVersion} onChange={handleVersionChange}>
                            <option value="" className="SellCarHideOption">Select a brand</option>
                            {allVersions.map((version) => (
                                <option key={version.id} value={version.id}>
                                    {version.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Body Car*</label>
                        <select id={errorStatusBody ? "sellCarSelectError" : "sellCarSelect"} value={selectedBodyCar} onChange={(e) => handleBodyCarChange(e)}>
                            <option value="" className="SellCarHideOption">Select a Body Car</option>
                            {allBodyCars.map((bodyCar) => (
                                <option key={bodyCar.id} value={bodyCar.id}>
                                    {bodyCar.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Engine*</label>
                        <input value={selectedEngine} id={errorStatusEngine ? "sellCarInputError" : "sellCarInput"} placeholder="V10" type="text" onChange={(e) => handleEngineChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Gasoline*</label>
                        <input value={selectedGasoline} id={errorStatusGasoline ? "sellCarInputError" : "sellCarInput"} placeholder="Premium" type="text" onChange={(e) => handleGasolineChange(e)}></input> {/*INPUT*/}
                    </div>
                </div>
            </div>
            <ErrorBlock divClassName='errorBlock-div' msgClassName='errorBlock-msg' iconClassName={'iconError'} errorStatus={fullError} msg={'You must to complete all files with *'} />
            <div className="sellCarAdminSection">
                <div className="sellCarAdminTitleContainer">
                    <h1 className="sellCarAdminTitle">Dealership Add Options</h1>
                </div>
                <div className="sellCarAdminButtons">
                    <button
                        value={selectedColor}
                        id="sellCarAdminInput"
                        onClick={() => {
                            addPopupFunction("color");
                        }}
                    >Color</button>
                    <button
                        value={selectedColor}
                        id="sellCarAdminInput"
                        onClick={() => addPopupFunction("model")}
                    >Model</button>
                    <button
                        value={selectedColor}
                        id="sellCarAdminInput"
                        onClick={() => addPopupFunction("version")}
                    >Version</button>
                </div>
            </div>
            <div className={`${isSticky ? 'sellCarButtonBox' : 'sellCarButtonBoxsticky'}`}>
                <div className="sellCarProductDetail">
                    <div className="sellCarNamesContainer">
                        {selectedBrand &&
                            allBrands
                                .filter((brand) => brand.id == selectedBrand)
                                .map((brand) => (
                                    <h2 key={brand.id} className="sellCarBrandNameDetail">{brand.name}</h2>
                                ))}
                        <h3 className="sellCarModelNameDetail">{selectedModel}</h3>
                    </div>
                    <div>
                        <h3 className="sellCarPriceDetail">{selectedPrice}$</h3>
                    </div>
                </div>
                <div className="sellCarButtonContainer">
                    <button onClick={cleanForm} className="sellCarPublishButton">Clean</button> :
                    {props.typeUpdate ?
                        <button onClick={sellCarButtonClick} className="sellCarPublishButton">Update Car</button> :
                        <button onClick={sellCarButtonClick} className="sellCarPublishButton">Sell Car</button>
                    }
                </div>
            </div>
            <AddPopup trigger={addPopup} type={addPopupType} setTrigger={setAddPopup}></AddPopup>
            <PreSubmit typeUpdate={props.typeUpdate} trigger={preSubmit} data={sellCarData} setTrigger={setPreSubmit}></PreSubmit>
        </div>

    )

}


export default sellCarBlock