import React, { useEffect, useState, useRef } from "react";
import "./filterProducts.css"
import { fetchApi, filterArrayFunction } from "../../modules/mainModules"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';;
import appInfo from "../../modules/appInfo";
import banner from "../../../public/ImageTestbannerfilter.jpg"
// import { loadConfigFromFile } from "vite";

function filterProducts(props) {
    // USE STATES
    // Render us
    const [models, setModels] = useState([])
    const [modelsRender, setModelsRender] = useState(false)
    const [brandsModels, setBrandsModels] = useState([])

    const [brandsModelsRender, setBrandsModelsRender] = useState(false)
    const [expandedBrands, setExpandedBrands] = useState({});
    const [selectedBrands, setSelectedBrands] = useState([]);

    const [selectedModel, setSelectedModel] = useState({});

    const [selectedBodyCar, setSelectedBodyCar] = useState([])

    const [brandsActive, setBrandsActive] = useState(false);
    const [modelsActive, setModelsActive] = useState(false);
    const [bodyCarActive, setBodyCarActive] = useState(false);
    // filter Functions us
    const [brandFilter, setBrandFilter] = useState([])
    const [modelFilter, setModelFilter] = useState([])
    const [yearFromFilter, setYearFromFilter] = useState('')
    const [yearToFilter, setYearToFilter] = useState('')
    const [kilometersFromFilter, setKilometersFromFilter] = useState('')
    const [kilometersToFilter, setKilometersToFilter] = useState('')
    const [priceFromFilter, setPriceFromFilter] = useState('')
    const [priceToFilter, setPriceToFilter] = useState('')
    const [colorFilter, setColorFilter] = useState([])
    const [bodyCarFilter, setbodyCarFilter] = useState([])
    const [transsmisionFilter, seTranssmisionFilter] = useState('')
    const [onSaleFilter, setOnSaleFilter] = useState(false)

    // Expands functions
    const toggleBrands = () => {
        setBrandsActive(!brandsActive);
        setModelsActive(false);
        setBodyCarActive(false)
    };
    const toggleBodyCars = () => {
        setBrandsActive(false);
        setModelsActive(false);
        setBodyCarActive(!bodyCarActive)
    }
    const toggleModels = () => {
        setModelsActive(!modelsActive);
        setBrandsActive(false);
        setBodyCarActive(false)
    };
    const resetFilters = () => {
        setBrandsActive(false);
        setModelsActive(false)
        setBodyCarActive(false)
    }
    const toggleBrand = (brandId) => {
        setExpandedBrands((prevExpandedBrands) => ({ ...prevExpandedBrands, [brandId]: !prevExpandedBrands[brandId], }));
    };
    const toggleBrand2 = (brandId) => {
        // Copiamos el array de marcas seleccionadas para evitar la mutación del estado
        const updatedSelectedBrands = [...selectedBrands];

        // Si la marca ya está en la !lista de seleccionadas, la eliminamos; de lo contrario, la agregamos
        if (updatedSelectedBrands.includes(brandId)) {
            updatedSelectedBrands.splice(updatedSelectedBrands.indexOf(brandId), 1);
        } else {
            updatedSelectedBrands.push(brandId);
        }

        // Actualizamos el estado con las marcas seleccionadas actualizadas
        setSelectedBrands(updatedSelectedBrands);
    };

    // Model toggle
    const toggleBodyCar = (brandId) => {
        // Copiamos el array de marcas seleccionadas para evitar la mutación del estado
        const updatedSelectedBodyCar = [...selectedBodyCar];

        // Si la marca ya está en la !lista de seleccionadas, la eliminamos; de lo contrario, la agregamos
        if (updatedSelectedBodyCar.includes(brandId)) {
            updatedSelectedBodyCar.splice(updatedSelectedBodyCar.indexOf(brandId), 1);
        } else {
            updatedSelectedBodyCar.push(brandId);
        }

        // Actualizamos el estado con las marcas seleccionadas actualizadas
        setSelectedBodyCar(updatedSelectedBodyCar);
    };

    const toggleModel = (modelName) => {
        // Crear una copia del estado actual de los modelos
        const updatedModelStates = { ...selectedModel };

        // Alternar el estado del modelo seleccionado
        updatedModelStates[modelName] = !updatedModelStates[modelName];

        // Actualizar el estado de los modelos
        setSelectedModel(updatedModelStates);
    };

    const generateCheckboxId = (modelName) => {
        // Reemplazar espacios y caracteres especiales con guiones bajos
        return `checkbox-${modelName.replace(/\s+/g, '_')}`;
    };

    const handleDivClick = (modelName) => {
        // Simular el clic en el checkbox correspondiente
        const checkboxId = generateCheckboxId(modelName);
        const checkbox = document.querySelector(`#${checkboxId}`);
        if (checkbox) {
            checkbox.click();
        }
    };

    // Changes Handlers 
    const brandFilterChangeFunction = (e) => {
        if (brandFilter.includes(e)) {
            const updatedFilter = brandFilter.filter((brand) => brand !== e);
            setBrandFilter(updatedFilter);
        } else {
            setBrandFilter([...brandFilter, e])
        }
    }
    const modelFilterChangeFunction = (e) => {
        if (modelFilter.includes(e)) {
            const updatedFilter = modelFilter.filter((model) => model !== e);
            setModelFilter(updatedFilter);
        } else {
            setModelFilter([...modelFilter, e])
        }
    }
    const yearFromFilterChangeFunction = (e) => {
        setYearFromFilter(e.target.value)
    }
    const yearToFilterChangeFunction = (e) => {
        setYearToFilter(e.target.value)
    }
    const kilometersFromFilterChangeFunction = (e) => {
        setKilometersFromFilter(e.target.value)
    }
    const kilometersToFilterChangeFunction = (e) => {
        setKilometersToFilter(e.target.value)
    }
    const priceFromFilterChangeFunction = (e) => {
        setPriceFromFilter(e.target.value)
    }
    const priceToFilterChangeFunction = (e) => {
        setPriceToFilter(e.target.value)
    }
    const colorFilterChangeFunction = (e) => { 
        if (colorFilter.includes(e)) {
            const updatedFilter = colorFilter.filter((color) => color !== e);
            setColorFilter(updatedFilter);
        } else {
            setColorFilter([...colorFilter, e])
        }
    }
    const bodyCarFilterChangeFunction = (e) => { 
        if (bodyCarFilter.includes(e)) {
            const updatedFilter = bodyCarFilter.filter((brand) => brand !== e);
            setbodyCarFilter(updatedFilter);
        } else {
            setbodyCarFilter([...bodyCarFilter, e])
        }
    }
    const transsmisionFilterChangeFunction = (e) => {
        seTranssmisionFilter(e.target.value)
    }
    const onSaleFilterChangeFunction = (e) => {
        setOnSaleFilter(!onSaleFilter)
    }

    // USE REFF
    const whiteRef = useRef()
    const blackRef = useRef()
    const redRef = useRef()
    const orangeRef = useRef()
    const grayRef = useRef()
    const blueRef = useRef()

    // USE EFECTS
    // Models
    useEffect(() => {
        props.models ? setModels(props.models) : null
    }, [props.models])
    useEffect(() => {
        if (models.length > 0) setModelsRender(true)
    }, [models])
    // Brand Models
    useEffect(() => {
        props.brandsModels ? setBrandsModels(props.brandsModels) : null
    }, [props.brandsModels])
    useEffect(() => {
        if (brandsModels.length > 0) setBrandsModelsRender(true)
    }, [brandsModels])
    useEffect(() => {
        colorFilter.includes("white") ? whiteRef.current.className = "circle white active" : whiteRef.current.className = "circle white"
        colorFilter.includes("black") ? blackRef.current.className = "circle black active" : blackRef.current.className = "circle black"
        colorFilter.includes("red") ? redRef.current.className = "circle red active" : redRef.current.className = "circle red"
        colorFilter.includes("orange") ? orangeRef.current.className = "circle orange active" : orangeRef.current.className = "circle orange"
        colorFilter.includes("gray") ? grayRef.current.className = "circle gray active" : grayRef.current.className = "circle gray"
        colorFilter.includes("blue") ? blueRef.current.className = "circle blue active" : blueRef.current.className = "circle blue"
    }, [colorFilter])
    // Filter products
    useEffect(() => {
        let allProducts = props.products
        if (brandFilter.length > 0) {
            const filterResponse = filterArrayFunction(allProducts, brandFilter, ((prod)=>prod.brand.name))
            allProducts = filterResponse
        } else { }
        if (modelFilter.length > 0) {
            const filterResponse = filterArrayFunction(allProducts, modelFilter, ((prod)=>prod.model.name))
            allProducts = filterResponse
        } else { }
        if (yearFromFilter) {

        } else { }
        if (yearToFilter) {

        } else { }
        if (kilometersFromFilter) {

        } else { }
        if (kilometersToFilter) {

        } else { }
        if (priceFromFilter) {

        } else { }
        if (priceToFilter) {

        } else { }
        if (colorFilter.length > 0) {

        } else { }
        if (bodyCarFilter.length > 0) {

        } else { }
        if (transsmisionFilter) {

        } else { }
        if (onSaleFilter) {

        } else { }

        props.setBrandProducts(allProducts)
    }, [brandFilter, modelFilter, yearFromFilter, yearToFilter, kilometersFromFilter, kilometersToFilter, priceFromFilter, priceToFilter, colorFilter, bodyCarFilter, transsmisionFilter, onSaleFilter])




    return (
        <div className={`filterComponent ${!(brandsActive || modelsActive || bodyCarActive) ? 'active' : ''}`}>
            <div className={`filterContainer ${!(brandsActive || modelsActive || bodyCarActive) ? 'active' : ''}`}>
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <h2 className="filterTitle">Filter</h2>
                )}
                {/* YEAR */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <div className="filterDate">
                        <h4 className="filterName">Year</h4>
                        <div className="dateContainer">
                            <div className="dateFrom">
                                <label>From</label>
                                <input placeholder="2007" className="inputYear" type="number" onChange={yearFromFilterChangeFunction}></input>
                            </div>
                            <div className="dateTo">
                                <label>To</label>
                                <input className="inputYear" placeholder="2024" type="number" onChange={yearToFilterChangeFunction}></input>
                            </div>
                        </div>
                    </div>
                )}
                {/* KM */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <div className="filterKM">
                        <h4 className="filterName">Kilometres</h4>
                        <div className="kmContainer">
                            <div className="kmFrom">
                                <label>From</label>
                                <input placeholder="1000" className="inputKM" type="number" onChange={kilometersFromFilterChangeFunction}></input>
                            </div>
                            <div className="kmTo">
                                <label>To</label>
                                <input type="number" placeholder="20000" className="inputKM" onChange={kilometersToFilterChangeFunction}></input>
                            </div>
                        </div>
                    </div>
                )}
                {/* PRICE */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <div className="filterKM">
                        <h4 className="filterName">Price</h4>
                        <div className="priceContainer">
                            <div className="priceFrom">
                                <label>From</label>
                                <input placeholder="1000" className="inputPrice" type="number" onChange={priceFromFilterChangeFunction}></input>
                            </div>
                            <div className="priceTo">
                                <label>To</label>
                                <input type="number" placeholder="20000" className="inputPrice" onChange={priceToFilterChangeFunction}></input>
                            </div>
                        </div>
                    </div>
                )}
                {/* COLOR */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <div className="filterColor">
                        <h4 className="filterName">Color</h4>
                        <div>
                            <span onClick={() => { colorFilterChangeFunction("white") }} ref={whiteRef} className={"circle white"}></span>
                            <span onClick={() => { colorFilterChangeFunction("black") }} ref={blackRef} className={"circle black"}></span>
                            <span onClick={() => { colorFilterChangeFunction("red") }} ref={redRef} className={"circle red"}></span>
                            <span onClick={() => { colorFilterChangeFunction("orange") }} ref={orangeRef} className={"circle orange"} ></span>
                            <span onClick={() => { colorFilterChangeFunction("gray") }} ref={grayRef} className={"circle gray"}></span>
                            <span onClick={() => { colorFilterChangeFunction("blue") }} ref={blueRef} className={"circle blue"}></span>
                        </div>
                    </div>
                )}
                {/* TRANSMISION */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <div className="filterTrasmision">
                        <h4 className="filterName">Transmision</h4>
                        <select onChange={transsmisionFilterChangeFunction} className="inputTransmision">
                            <option value={null} disabled selected className="puto">Select Option</option>
                            <option value={"manual"}>Manual</option>
                            <option value={"automatic"}>Automatic</option>
                        </select>
                    </div>
                )}
                {/*BODYCAR*/}
                {props.bodyCar ? <div>
                    {!(brandsActive || modelsActive || bodyCarActive) && (
                        <div>
                            <h4 onClick={toggleBodyCars} className="filterNameOption">BodyCar</h4>
                        </div>
                    )}
                    {bodyCarActive && (
                        <div className={`modelsInputDiv${bodyCarActive ? 'active' : ''}`}>
                            <div className="filterOptions">
                                {/*<button onClick={resetFilters} className="exitOptions">Go Back</button>*/}
                                <div onClick={resetFilters} className="arrow prev" />
                                <h4 className="filterNameSelect">BodyCar</h4>
                            </div>
                            <div className="scrollable-content">
                                {props.bodyCar.map((bodyCar) => (
                                    <div
                                        key={bodyCar.id}
                                        className={`modelDivCheckbox ${selectedBodyCar.includes(bodyCar.id) ? 'selected-brand' : ''}`}
                                        onClick={() => {
                                            toggleBodyCar(bodyCar.id)
                                            bodyCarFilterChangeFunction(bodyCar.name)
                                        }
                                        }
                                    >
                                        <input type="checkbox" className="checkBoxBrand" id="" />
                                        <p>{bodyCar.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div> : null}
                {/* BRANDS */}
                {props.brands ? <div>
                    {!(brandsActive || modelsActive || bodyCarActive) && (
                        <h4 onClick={toggleBrands} className="filterNameOption">Brand</h4>
                    )}
                    {brandsActive && (
                        <div className="modelsInputDiv">
                            <div className="filterOptions">
                                <div onClick={resetFilters} className="arrow prev" />
                                <h4 onClick={toggleBrands} className="filterNameSelect">Brand</h4>
                            </div>
                            <div className="scrollable-content">
                                {props.brands.map((brand) => (
                                    <div
                                        key={brand.id}
                                        className={`modelDivCheckbox ${selectedBrands.includes(brand.id) ? 'selected-brand' : ''}`}
                                        onClick={
                                            () => {
                                                toggleBrand2(brand.id)
                                                brandFilterChangeFunction(brand.name)
                                            }
                                        }
                                    >
                                        <input type="checkbox" className="checkBoxBrand" id="" />
                                        <p>{brand.name}</p>
                                        <img className="logoBrandFilter" src={`${appInfo.root}/images/brands/${brand.logo}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div> : null}
                {/* MODELS */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <h4 onClick={toggleModels} className="filterNameOption">Model</h4>
                )}
                {modelsActive && (
                    <div className="modelsInputDiv">
                        <div className="filterOptions">
                            <div onClick={resetFilters} className="arrow prev" />
                            <h4 onClick={toggleModels} className="filterNameSelect">Model</h4>
                        </div>
                        {/* MODELS (allProducts) */}
                        {modelsRender ?
                            <div className="scrollable-content">
                                {models.map((modelBrand) => (
                                    <div key={modelBrand.brandId} className="brandModels">
                                        <div
                                            className={`filterModlesBrandName${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                            onClick={() => { toggleBrand(modelBrand.brandId); }
                                            }
                                        >
                                            <p>{modelBrand.brandName}</p>
                                            <FontAwesomeIcon
                                                icon={expandedBrands[modelBrand.brandId] ? faAngleUp : faAngleDown}
                                                className={`arrow-icon${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                            />
                                        </div>
                                        <div className={`filterModelsNames${expandedBrands[modelBrand.brandId] ? 'expanded' : 'hideOptions'}`}>
                                            {modelBrand.models
                                                ? modelBrand.models.map((modelsNames) => (
                                                    <div key={modelsNames.id} className="filterModelsNameDiv" onClick={(() => {
                                                        modelFilterChangeFunction(modelsNames.name)
                                                        toggleModel(modelsNames.name)
                                                        handleDivClick(modelsNames.name);
                                                    })}>
                                                        <input type="checkbox" name="modelNameInput" id={generateCheckboxId(modelsNames.name)} defaultChecked={selectedModel[modelsNames.name] || false} onChange={() => {
                                                            toggleModel(modelsNames.name);
                                                        }} />
                                                        <p htmlFor={generateCheckboxId(modelsNames.name)} className="modelNameFilter">{modelsNames.name}</p>
                                                    </div>
                                                ))
                                                : null}
                                        </div>
                                    </div>
                                ))}
                            </div> : null}
                        {/* MODELS (brandProduct) */}
                        {brandsModelsRender ?
                            <div className="scrollable-content">
                                {brandsModels.map((modelBrand) => (
                                    <div key={modelBrand.id} className="brandModels">
                                        <div
                                            className={`filterModlesBrandName${expandedBrands[modelBrand.id] ? 'expanded' : ''}`}
                                            onClick={() => { toggleBrand(modelBrand.id); }

                                            }
                                        >
                                            <p>{modelBrand.name}</p>
                                            <FontAwesomeIcon
                                                icon={expandedBrands[modelBrand.id] ? faAngleUp : faAngleDown}
                                                className={`arrow-icon${expandedBrands[modelBrand.id] ? 'expanded' : ''}`}
                                            />
                                        </div>
                                        <div className={`filterModelsNames${expandedBrands[modelBrand.id] ? 'expanded' : 'hideOptions'}`}>
                                            {/* {modelBrand.models
                                                ? modelBrand.models.map((modelsNames) => (
                                                    <div key={modelsNames.id} className="filterModelsNameDiv">
                                                        <input type="checkbox" name="modelNameInput" id="" />
                                                        <p htmlFor="modelNameInput" className="modelNameFilter">{modelsNames.name}</p>
                                                    </div>
                                                ))
                                                : null} */}
                                        </div>
                                    </div>
                                ))}
                            </div> : null}
                    </div>
                )}
                {/* ON SALE */}
                {!(brandsActive || modelsActive || bodyCarActive) && (
                    <div className="onSaleFilter">
                        <h4>On sale</h4>
                        <div className="checkbox-wrapper-64">
                            <label className="switch">
                                <input
                                    type="checkbox" onChange={onSaleFilterChangeFunction} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}


export default filterProducts