import React, { useState, useRef, useEffect } from "react";
import './sellCarBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo"
import AddPopup from '../Popups/addPopup/addPopup.jsx'
import PreSubmit from '../Popups/preSubmit/preSubmit.jsx'
import ErrorBlock from '../errors/errorBlock/errorBlock.jsx'


function sellCarBlock() {

    const [isSticky, setIsSticky] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedBodyCar, setSelectedBodyCar] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('')
    const [selectedDescription, setSelectedDescription] = useState('')
    const [selectedDiscount, setSelectedDiscount] = useState('')
    const [selectedKilometers, setSelectedKilometers] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [selectedVersion, setSelectedVersion] = useState('')
    const [selectedDamage, setSelectedDamage] = useState('')
    const [selectedGasoline, setSelectedGasoline] = useState('')
    const [selectedEngine, setSelectedEngine] = useState('')

    // ErrorsStatus
    const [errorStatusImages, setErrorStatusImages] = useState('')
    const [errorMsgImages, setErrorMsgImages] = useState('')
    const [errorStatusColor, setErrorStatusColor] = useState('')
    const [errorMsgColor, setErrorMsgColor] = useState('')
    const [errorStatusBrand, setErrorStatusBrand] = useState('')
    const [errorMsgBrand, setErrorMsgBrand] = useState('')
    const [errorStatusModel, setErrorStatusModel] = useState('')
    const [errorMsgModel, setErrorMsgModel] = useState('')
    const [errorStatusBody, setErrorStatusBody] = useState('')
    const [errorMsgBody, setErrorMsgBody] = useState('')
    const [errorStatusTransmission, setErrorStatusTransmission] = useState('')
    const [errorMsgTransmission, setErrorMsgTransmission] = useState('')
    const [errorStatusPrice, setErrorStatusPrice] = useState('')
    const [errorMsgPrice, setErrorMsgPrice] = useState('')
    const [errorStatusDescription, setErrorStatusDescription] = useState('')
    const [errorMsgDescription, setErrorMsgDescription] = useState('')
    const [errorStatusDiscount, setErrorStatusDiscount] = useState('')
    const [errorMsgDiscount, setErrorMsgDiscount] = useState('')
    const [errorStatusKilometers, setErrorStatusKilometers] = useState('')
    const [errorMsgKilometers, setErrorMsgKilometers] = useState('')
    const [errorStatusYear, setErrorStatusYear] = useState('')
    const [errorMsgYear, setErrorMsgYear] = useState('')
    const [errorStatusVersion, setErrorStatusVersion] = useState('')
    const [errorMsgVersion, setErrorMsgVersion] = useState('')
    const [errorStatusDamage, setErrorStatusDamage] = useState('')
    const [errorMsgDamage, setErrorMsgDamage] = useState('')
    const [errorStatusGasoline, setErrorStatusGasoline] = useState('')
    const [errorMsgGasoline, setErrorMsgGasoline] = useState('')
    const [errorStatusEngine, setErrorStatusEngine] = useState('')
    const [errorMsgEngine, setErrorMsgEngine] = useState('')


    const [allBrands, setAllBrands] = useState([]);
    const [allModels, setAllModels] = useState([]);
    const [allBodyCars, setAllBodyCars] = useState([])
    const [allColors, setAllColors] = useState([])

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const refErrorImg = useRef()
    const refInputImg = useRef()
    const refImageIcon = useRef()

    const [addPopupType, setAddPopupType] = useState("")
    const [addPopup, setAddPopup] = useState(false);

    const [preSubmit, setPreSubmit] = useState(true) // ---------------

    const[sellCarData, setSellCarData] = useState({})

    const addPopupFunction = (type) => {
        if (!addPopup) setAddPopup(true)
        if (addPopup) setAddPopup(false)
        type === "color" ? setAddPopupType("color") : null
        type === "model" ? setAddPopupType("model") : null
        type === "version" ? setAddPopupType("version") : null
    }

    // FUNCTIONS

    const isErrorRequired = () => {
        if(errorStatusImages || errorStatusColor || errorStatusBrand || errorStatusModel || errorStatusBody || errorStatusTransmission || errorStatusPrice || errorStatusDescription || errorStatusKilometers || errorStatusYear || errorStatusVersion || errorStatusGasoline || errorStatusEngine){
            return true
        } else {
            return false
        }
    }

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
    };
    const handleColorChange = (e) => {
        const newColor = e.target.value
        setSelectedColor(newColor)
    }
    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.value;
        setSelectedBrand(selectedBrandId);
        setSelectedModel('');
        setSelectedModel(allModels.filter((model) => model.brand_id === selectedBrandId));
    };
    const handleModelChange = (e) => {
        const newModel = e.target.value
        setSelectedModel(newModel)
    }
    const handleBodyCarChange = (e) => {
        const newBody = e.target.value
        setSelectedBodyCar(newBody)
    }
    const handleTransmissionChange = (e) => {
        const newTransmission = e.target.value
        setSelectedTransmission(newTransmission)
    }
    const handlePriceChange = (e) => {
        const newPrice = e.target.value
        setSelectedPrice(newPrice)
    }
    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value
        setSelectedDescription(newDescription)
    }
    const handleDiscountChange = (e) => {
        const newDiscount = e.target.value
        setSelectedDiscount(newDiscount)
    }
    const handleKilometersChange = (e) => {
        const newKilometers = e.target.value
        setSelectedKilometers(newKilometers)
    }
    const handleYearChange = (e) => {
        const newYear = e.target.value
        setSelectedYear(newYear)
    }
    const handleVersionChange = (e) => {
        const newVersion = e.target.value
        setSelectedVersion(newVersion)
    }
    const handleDamageChange = (e) => {
        const newDamage = e.target.value
        setSelectedDamage(newDamage)
    }
    const handleGasolineChange = (e) => {
        const newGasoline = e.target.value
        setSelectedGasoline(newGasoline)
    }
    const handleEngineChange = (e) => {
        const newEngine = e.target.value
        setSelectedEngine(newEngine)
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
            Engine: selectedEngine
        }
       
        // Images
        if (data.Images.length < 1) {
            setErrorStatusImages(true)
            setErrorMsgImages('You must add car images')
        } else {
            setErrorStatusImages(false)
        }
        // Description
        if (!data.Description) {
            setErrorStatusDescription(true)
            setErrorMsgDescription('You must add a car description')
        } else {
            setErrorStatusDescription(false)
        }
        // Color
        if (!data.Color) {
            setErrorStatusColor(true)
            setErrorMsgColor('You must complete this file')
        } else {
            setErrorStatusColor(false)
        }
        // Brand
        if (!data.Brand) {
            setErrorStatusBrand(true)
            setErrorMsgBrand('You must complete this file')
        } else {
            setErrorStatusBrand(false)
        }
        // Model
        if (!data.Model) {
            setErrorStatusModel(true)
            setErrorMsgModel('You must complete this file')
        } else {
            setErrorStatusModel(false)
        }
        // Body
        if (!data.Body) {
            setErrorStatusBody(true)
            setErrorMsgBody('You must complete this file')
        } else {
            setErrorStatusBody(false)
        }
        // Transmission
        if (!data.Transmission) {
            setErrorStatusTransmission(true)
            setErrorMsgTransmission('You must complete this file')
        } else {
            setErrorStatusTransmission(false)
        }
        // Price
        if (!data.Price) {
            setErrorStatusPrice(true)
            setErrorMsgPrice('You must complete this file')
        } else {
            setErrorStatusPrice(false)
        }
        // Kilometers
        if (!data.Kilometers) {
            setErrorStatusKilometers(true)
            setErrorMsgKilometers('You must complete this file')
        } else {
            setErrorStatusKilometers(false)
        }
        // Year
        if (!data.Year) {
            setErrorStatusYear(true)
            setErrorMsgYear('You must complete this file')
        } else {
            setErrorStatusYear(false)
        }
        // Version
        if (!data.Version) {
            setErrorStatusVersion(true)
            setErrorMsgVersion('You must complete this file')
        } else {
            setErrorStatusVersion(false)
        }
        // Gasoline
        if (!data.Gasoline) {
            setErrorStatusGasoline(true)
            setErrorMsgGasoline('You must complete this file')
        } else {
            setErrorStatusGasoline(false)
        }
        // Engine
        if (!data.Engine) {
            setErrorStatusEngine(true)
            setErrorMsgEngine('You must complete this file')
        } else {
            setErrorStatusEngine(false)
        }

        if(isErrorRequired()){
            console.log(`Car information:`);
            console.log(data);
            setSellCarData(data)
            setPreSubmit(true)
        }else{
            setPreSubmit(false)
        }
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
                    <label htmlFor="sellCarInputImage" className={errorStatusImages? "file-upload-label-error" :"file-upload-label"}>
                        <i className="fa-solid fa-plus"><FontAwesomeIcon icon={faImages} /></i>
                        <p className="sellCarUploadTitle">Upload Images</p>
                    </label>
                    <input type="file" id="sellCarInputImage" name="productFile" multiple onChange={handleImageChange} className="file-upload-input" />
                    <h5 ref={refErrorImg} className='sellCarImageError'>File extension not allowed</h5>
                    <div ref={refInputImg} className="sellCarImageSection">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="sellCarImagePreview">
                                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                                <a onClick={(event) => removeImg(index, event)}><i className="sellCarXmark"><FontAwesomeIcon icon={faX} /></i></a>
                            </div>
                        ))}
                        <label><i ref={refImageIcon} className="addImageIcon"></i></label>
                    </div>
                </div>
            </div>
            <div className="flexRow">
                <div className="rowOne">
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Description*</label>
                        <input id={errorStatusDescription ? "sellCarInputError" : "sellCarInput"} placeholder="Porsche cayane 3.8gt" type="text" onChange={(e) => handleDescriptionChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer" className="sellCarPriceInputContainer" >
                        <label id="sellCarLabel">Price*</label>
                        <input id={errorStatusPrice ? "sellCarInputError" : "sellCarInput"} placeholder="20000" type="number" inputMode="numeric" onChange={(e) => handlePriceChange(e)}></input> {/*INPUT*/}
                        <p className="sellCarPriceIcon">$</p>
                    </div>
                    <div id="sellCarInputContainer" className="sellCarDiscountInputContainer">
                        <label id="sellCarLabel">Discount</label>
                        <input id={errorStatusDiscount ? "sellCarInputError" : "sellCarInput"} placeholder="20" type="number" onChange={(e) => handleDiscountChange(e)}></input> {/*INPUT*/}
                        <p className="sellCarDiscountIcon">%</p>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Kilometers*</label>
                        <input id={errorStatusKilometers ? "sellCarInputError" : "sellCarInput"} placeholder="1000" type="number" onChange={(e) => handleKilometersChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Year*</label>
                        <input id={errorStatusYear ? "sellCarInputError" : "sellCarInput"} placeholder="2021" type="number" onChange={(e) => handleYearChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Color*</label>
                        <select id={errorStatusColor ? "sellCarSelectError" : "sellCarSelect"} value={selectedColor} onChange={(e) => handleColorChange(e)}>
                            <option value="" className="SellCarHideOption">Select a color</option>
                            {allColors.map(color => (
                                <option key={color.id} value={color.code}>{color.name}</option>
                            ))}
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Damage</label>
                        <input type="text" id="sellCarSelect" placeholder="Front Crash" onChange={(e) => handleDamageChange(e)}></input> {/*INPUT*/}

                    </div>
                </div>
                <div className="rowTwo">
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Brand*</label>
                        <select id={errorStatusBrand ? "sellCarSelectError" : "sellCarSelect"} value={selectedBrand} onChange={handleBrandChange}>
                            <option value="" className="SellCarHideOption">Select a brand</option>
                            {allBrands.map((brand) => (
                                <option key={brand.brandId} value={brand.id}>
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
                                        <option key={model.id} value={model.name}>
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
                        <input type="text" placeholder="GTI" id={errorStatusVersion ? "sellCarInputError" : "sellCarInput"} onChange={(e) => handleVersionChange(e)}></input> {/*INPUT*/}
                    </div>

                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Body Car*</label>
                        <select id={errorStatusBody ? "sellCarSelectError" : "sellCarSelect"} value={selectedBodyCar} onChange={(e) => handleBodyCarChange(e)}>
                            <option value="" className="SellCarHideOption">Select a Body Car</option>
                            {allBodyCars.map((bodyCar) => (
                                <option key={bodyCar.id} value={bodyCar.name}>
                                    {bodyCar.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Engine*</label>
                        <input id={errorStatusEngine ? "sellCarInputError" : "sellCarInput"} placeholder="V10" type="text" onChange={(e) => handleEngineChange(e)}></input> {/*INPUT*/}
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Gasoline*</label>
                        <input id={errorStatusGasoline ? "sellCarInputError" : "sellCarInput"} placeholder="Premium" type="text" onChange={(e) => handleGasolineChange(e)}></input> {/*INPUT*/}
                    </div>
                </div>
            </div>
            <ErrorBlock divClassName='errorBlock-div' msgClassName='errorBlock-msg' iconClassName={'iconError'} errorStatus={isErrorRequired()} msg={'You must to complete all files with *'} />
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
                                    <h2 className="sellCarBrandNameDetail">{brand.name}</h2>
                                ))}
                        <h3 className="sellCarModelNameDetail">{selectedModel}</h3>
                    </div>
                    <div>
                        <h3 className="sellCarPriceDetail">{selectedPrice}$</h3>
                    </div>
                </div>
                <div className="sellCarButtonContainer">
                    <button onClick={sellCarButtonClick} className="sellCarPublishButton">Sell Car</button>
                </div>
            </div>
            <AddPopup trigger={addPopup} type={addPopupType} setTrigger={setAddPopup}></AddPopup>
            <PreSubmit trigger={preSubmit} data={sellCarData} setTrigger={setPreSubmit}></PreSubmit>
        </div>

    )

}


export default sellCarBlock