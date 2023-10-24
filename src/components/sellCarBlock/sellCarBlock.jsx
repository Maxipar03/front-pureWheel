import React, { useState, useRef, useEffect } from "react";
import './sellCarBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo"
import AddPopup from '../Popups/addPopup/addPopup.jsx'


function sellCarBlock() {

    const [isSticky, setIsSticky] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedBodyCar, setSelectedBodyCar] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('')

    const [allBrands, setAllBrands] = useState([]);
    const [allModels, setAllModels] = useState([]);
    const [allBodyCars, setAllBodyCars] = useState([])

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const refErrorImg = useRef()
    const refInputImg = useRef()
    const refImageIcon = useRef()

    const [addPopup, setAddPopup] = useState(false);
    const [addPopupType, setAddPopupType] = useState("")
    const addPopupFunction = (type) => {
        if (!addPopup) setAddPopup(true)
        if (addPopup) setAddPopup(false)
        type === "color" ? setAddPopupType("color") : null
        type === "model" ? setAddPopupType("model") : null
        type === "version" ? setAddPopupType("version") : null
    }

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

    const removeImg = (index, event) => {
        event.preventDefault()
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.value;
        setSelectedBrand(selectedBrandId);
        setSelectedModel('');
        setSelectedModel(allModels.filter((model) => model.brand_id === selectedBrandId));
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
                    <label htmlFor="sellCarInputImage" className="file-upload-label">
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
                        <input id="sellCarInput" placeholder="Porsche cayane 3.8gt" type="text"></input>
                    </div>
                    <div id="sellCarInputContainer" className="sellCarPriceInputContainer" >
                        <label id="sellCarLabel">Price*</label>
                        <input id="sellCarInput" placeholder="20000" type="number" inputMode="numeric" onChange={(e) => setSelectedPrice(e.target.value)}></input>
                        <p className="sellCarPriceIcon">$</p>
                    </div>
                    <div id="sellCarInputContainer" className="sellCarDiscountInputContainer">
                        <label id="sellCarLabel">Discount</label>
                        <input id="sellCarInput" placeholder="20" type="number"></input>
                        <p className="sellCarDiscountIcon">%</p>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Kilometers*</label>
                        <input id="sellCarInput" placeholder="1000" type="number"></input>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Year*</label>
                        <input id="sellCarInput" placeholder="2021" type="number"></input>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Color*</label>
                        <select id="sellCarSelect" value={selectedColor}>
                            <option value="" className="SellCarHideOption">Select a color</option>
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Damage</label>
                        <input type="text" id="sellCarSelect" placeholder="Front Crash"></input>

                    </div>
                </div>
                <div className="rowTwo">
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Brand*</label>
                        <select id="sellCarSelect" value={selectedBrand} onChange={handleBrandChange}>
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
                        <select id="sellCarSelect" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
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
                        <select id="sellCarSelect" value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)}>
                            <option value="" className="SellCarHideOption">Select a transmission</option>
                            <option>Manual</option>
                            <option>Automatic</option>
                        </select>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Version</label>
                        <input type="text" placeholder="GTI" id="sellCarInput"></input>
                    </div>

                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Body Car*</label>
                        <select id="sellCarSelect" value={selectedBodyCar} onChange={(e) => setSelectedBodyCar(e.target.value)}>
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
                        <input id="sellCarInput" placeholder="V10" type="text"></input>
                    </div>
                    <div id="sellCarInputContainer">
                        <label id="sellCarLabel">Gasoline*</label>
                        <input id="sellCarInput" placeholder="Premium" type="text"></input>
                    </div>
                </div>
            </div>
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
                    <button className="sellCarPublishButton">Sell Car</button>
                </div>
            </div>
            <AddPopup trigger={addPopup} type={addPopupType} setTrigger={setAddPopup}></AddPopup>
        </div>

    )

}


export default sellCarBlock