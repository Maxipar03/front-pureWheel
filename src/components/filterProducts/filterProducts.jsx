import React, { useEffect, useState, useRef } from "react"
import "./filterProducts.css"
import { filterArrayFunction, filterFromFunction, filterToFunction, findCommonProducts } from "../../modules/mainModules"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion, AnimatePresence  } from "framer-motion"
import { faAngleDown, faAngleUp, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import appInfo from "../../modules/appInfo"
import banner from "../../public/ImageTestbannerfilter.jpg"
// import { loadConfigFromFile } from "vite"

function filterProducts(props) {
    // USE STATES
    // Render us
    const [models, setModels] = useState([])
    const [modelsRender, setModelsRender] = useState(false)
    const [brandsModels, setBrandsModels] = useState([])

    const [brandsModelsRender, setBrandsModelsRender] = useState(false)
    const [expandedBrands, setExpandedBrands] = useState({})
    const [selectedBrands, setSelectedBrands] = useState([])

    const [selectedModel, setSelectedModel] = useState({})

    const [selectedBodyCar, setSelectedBodyCar] = useState([])

    const [brandsActive, setBrandsActive] = useState(false)
    const [modelsActive, setModelsActive] = useState(false)
    const [versionsActive, setVersionsActive] = useState(false)
    const [bodyCarActive, setBodyCarActive] = useState(false)
    
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

    console.log(props)

    // Expands functions
    const toggleBrands = () => {
        setBrandsActive(!brandsActive)
        setModelsActive(false)
        setBodyCarActive(false)
    }
    const toggleBodyCars = () => {
        setBrandsActive(false)
        setModelsActive(false)
        setBodyCarActive(!bodyCarActive)
        setVersionsActive(false)
    }
    const toggleModels = () => {
        setModelsActive(!modelsActive)
        setBrandsActive(false)
        setBodyCarActive(false)
        setVersionsActive(false)
    }
    const toggleVersions = () => {
        setModelsActive(false)
        setBrandsActive(false)
        setBodyCarActive(false)
        setVersionsActive(!versionsActive)
    }
    const resetFilters = () => {
        setBrandsActive(false)
        setModelsActive(false)
        setBodyCarActive(false)
        setVersionsActive(false)
    }
    const toggleBrand = (brandId) => {
        setExpandedBrands((prevExpandedBrands) => ({ ...prevExpandedBrands, [brandId]: !prevExpandedBrands[brandId], }))
    }
    const toggleBrand2 = (brandId) => {
        // Copiamos el array de marcas seleccionadas para evitar la mutación del estado
        const updatedSelectedBrands = [...selectedBrands]

        // Si la marca ya está en la !lista de seleccionadas, la eliminamos de lo contrario, la agregamos
        if (updatedSelectedBrands.includes(brandId)) {
            updatedSelectedBrands.splice(updatedSelectedBrands.indexOf(brandId), 1)
        } else {
            updatedSelectedBrands.push(brandId)
        }

        // Actualizamos el estado con las marcas seleccionadas actualizadas
        setSelectedBrands(updatedSelectedBrands)
    }
    const classNameColorFunction = (colorId) => {
        colorFilter.forEach(color=>color === colorId ? "circle active" : "circle")
    }


    // Model toggle
    const toggleBodyCar = (brandId) => {
        // Copiamos el array de marcas seleccionadas para evitar la mutación del estado
        const updatedSelectedBodyCar = [...selectedBodyCar]

        // Si la marca ya está en la !lista de seleccionadas, la eliminamos de lo contrario, la agregamos
        if (updatedSelectedBodyCar.includes(brandId)) {
            updatedSelectedBodyCar.splice(updatedSelectedBodyCar.indexOf(brandId), 1)
        } else {
            updatedSelectedBodyCar.push(brandId)
        }

        // Actualizamos el estado con las marcas seleccionadas actualizadas
        setSelectedBodyCar(updatedSelectedBodyCar)
    }

    const toggleModel = (modelName) => {
        // Crear una copia del estado actual de los modelos
        const updatedModelStates = { ...selectedModel }

        // Alternar el estado del modelo seleccionado
        updatedModelStates[modelName] = !updatedModelStates[modelName]

        // Actualizar el estado de los modelos
        setSelectedModel(updatedModelStates)
    }

    const generateCheckboxId = (modelName) => {
        // Reemplazar espacios y caracteres especiales con guiones bajos
        return `checkbox-${modelName.replace(/\s+/g, '_')}`
    }

    const handleDivClick = (modelName) => {
        // Simular el clic en el checkbox correspondiente
        const checkboxId = generateCheckboxId(modelName)
        const checkbox = document.querySelector(`#${checkboxId}`)
        if (checkbox) {
            checkbox.click()
        }
    }


    // Changes Handlers 
    const brandFilterChangeFunction = (e) => {
        if (brandFilter.includes(e)) {
            const updatedFilter = brandFilter.filter((brand) => brand !== e)
            setBrandFilter(updatedFilter)
        } else {
            setBrandFilter([...brandFilter, e])
        }
    }
    const modelFilterChangeFunction = (e) => {
        if (modelFilter.includes(e)) {
            const updatedFilter = modelFilter.filter((model) => model !== e)
            setModelFilter(updatedFilter)
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
            const updatedFilter = colorFilter.filter((color) => color !== e)
            setColorFilter(updatedFilter)
        } else {
            setColorFilter([...colorFilter, e])
        }
    }
    const bodyCarFilterChangeFunction = (e) => {
        if (bodyCarFilter.includes(e)) {
            const updatedFilter = bodyCarFilter.filter((brand) => brand !== e)
            setbodyCarFilter(updatedFilter)
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
    // Filter products
    useEffect(() => {
        let allProductsFilter = {}
        if (brandFilter.length > 0) {
            const filterResponse = filterArrayFunction(props.products, brandFilter, ((prod) => prod.brand.name))
            allProductsFilter.brand = filterResponse
        } else {
            delete allProductsFilter.brand
        }
        if (modelFilter.length > 0) {
            const filterResponse = filterArrayFunction(props.products, modelFilter, ((prod) => prod.model.name))
            allProductsFilter.model = filterResponse
        } else {
            delete allProductsFilter.model
        }
        if (colorFilter.length > 0) {
            const filterResponse = filterArrayFunction(props.products, colorFilter, ((prod) => prod.color_id ))
            allProductsFilter.color = filterResponse
        } else {
            delete allProductsFilter.color
        }
        if (bodyCarFilter.length > 0) {
            const filterResponse = filterArrayFunction(props.products, bodyCarFilter, ((prod) => prod.bodyCar.name))
            allProductsFilter.bodyCar = filterResponse
        } else {
            delete allProductsFilter.bodyCar
        }
        if (yearFromFilter) {
            const filterResponse = filterFromFunction(props.products, yearFromFilter, ((prod) => prod.year))
            allProductsFilter.yearFrom = filterResponse
        } else {
            delete allProductsFilter.yearFrom
        }
        if (yearToFilter) {
            const filterResponse = filterToFunction(props.products, yearToFilter, ((prod) => prod.year))
            allProductsFilter.yearTo = filterResponse
        } else {
            delete allProductsFilter.yearTo
        }
        if (kilometersFromFilter) {
            const filterResponse = filterFromFunction(props.products, kilometersFromFilter, ((prod) => prod.km))
            allProductsFilter.kilometersFrom = filterResponse
        } else {
            delete allProductsFilter.kilometersFrom
        }
        if (kilometersToFilter) {
            const filterResponse = filterToFunction(props.products, kilometersToFilter, ((prod) => prod.km))
            allProductsFilter.kilometersTo = filterResponse
        } else {
            delete allProductsFilter.kilometersTo
        }
        if (priceFromFilter) {
            const filterResponse = filterFromFunction(props.products, priceFromFilter, ((prod) => prod.price))
            allProductsFilter.priceFrom = filterResponse
        } else {
            delete allProductsFilter.priceFrom
        }
        if (priceToFilter) {
            const filterResponse = filterToFunction(props.products, priceToFilter, ((prod) => prod.price))
            allProductsFilter.priceTo = filterResponse
        } else {
            delete allProductsFilter.priceTo
        }
        if (transsmisionFilter === 'Manual' || transsmisionFilter === 'Automatic') {
            const filterResponse = filterArrayFunction(props.products, [transsmisionFilter], ((prod) => prod.transmission))
            allProductsFilter.transmission = filterResponse
        } else {
            delete allProductsFilter.transmission
        }
        if (onSaleFilter) {
            const filterResponse = []
            props.products.forEach(prod => {
                if (prod.onSale != null) {
                    filterResponse.push(prod)
                }
            })
            allProductsFilter.onSale = filterResponse
        } else {
            delete allProductsFilter.onSale
        }
        const filterLength = Object.keys(allProductsFilter)
        if (filterLength.length > 0) {
            let commonValues = findCommonProducts(allProductsFilter)
            props.setBrandProducts(commonValues)
        } else {
            props.setBrandProducts(props.products)
        }
    }, [brandFilter, modelFilter, yearFromFilter, yearToFilter, kilometersFromFilter, kilometersToFilter, priceFromFilter, priceToFilter, colorFilter, bodyCarFilter, transsmisionFilter, onSaleFilter])
// color classname logic


    return (  
        <div className={`filterComponent ${!(brandsActive || modelsActive || bodyCarActive || versionsActive) ? 'active' : ''}`}>
            <div className={`filterContainer ${!(brandsActive || modelsActive || bodyCarActive || versionsActive) ? 'active' : ''}`}>
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
                    <h2 className="filterTitle">Filter</h2>
                )}
                {/* YEAR */}
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
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
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
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
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
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
                {/* TRANSMISION */}
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive|| versionsActive) && (
                    <div className="filterTrasmision">
                        <h4 className="filterName">Transmision</h4>
                        <select onChange={transsmisionFilterChangeFunction} className="inputTransmision">
                            <option value={"Both"}>Both</option>
                            <option value={"Manual"}>Manual</option>
                            <option value={"Automatic"}>Automatic</option>
                        </select>
                    </div>
                )}
                 {/* COLOR */}
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
                    <div className="filterColor">
                        <h4 className="filterName">Color</h4>
                        <div>
                    {props.colors.length > 0 ? 
                    props.colors.map(color => (
                        <span key={color.id} onClick={() => { colorFilterChangeFunction(color.id) }} style={{backgroundColor: `${color.code}`}} className={colorFilter.find((element) => element === color.id) ? "circle active" : "circle"}></span>
                        ) )
                        : null}
                        </div>
                    </div>
                )}
                {/*BODYCAR*/}
                {props.bodyCar ? <div>
                    {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
                        <div>
                            <h4 onClick={toggleBodyCars} className="filterNameOption">BodyCar</h4>
                        </div>
                    )}
                    {bodyCarActive && (
                        <AnimatePresence mode="wait" >
                        <motion.div 
                        className={`modelsInputDiv${bodyCarActive ? 'active' : ''}`}
                        initial={{x: 100}}
                        animate={{x: 0}}
                        key={bodyCarActive}
                        exit={{ opacity: 0 }}
                        >
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
                        </motion.div>
                        </AnimatePresence>
                    )}
                </div> : null}
                {/* BRANDS */}
                {props.brands ? <div>
                    {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
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
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive ) && (
                    <h4 onClick={toggleModels} className="filterNameOption">Model</h4>
                )}
                {modelsActive && (
                    <div className="modelsInputDiv">
                        <div className="filterOptions">
                            <div onClick={resetFilters} className="arrow prev" />
                            <h4 onClick={toggleModels} className="filterNameSelect">Model</h4>
                        </div>
                        {/* MODELS (allProductsFilter) */}
                        {modelsRender ?
                            <div className="scrollable-content">
                                {models.map((modelBrand) => (
                                    <div key={modelBrand.brandId} className="brandModels">
                                        <div
                                            className={`filterModlesBrandName${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                            onClick={() => { toggleBrand(modelBrand.brandId) }
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
                                                        handleDivClick(modelsNames.name)
                                                    })}>
                                                        <input type="checkbox" name="modelNameInput" id={generateCheckboxId(modelsNames.name)} defaultChecked={selectedModel[modelsNames.name] || false} onChange={() => {
                                                            toggleModel(modelsNames.name)
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
                                            onClick={() => { toggleBrand(modelBrand.id) }

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
                {/* VERSIONS */}
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
                    <h4 onClick={toggleVersions} className="filterNameOption">Versions</h4>
                )}
                {versionsActive && (
                    <div className="modelsInputDiv">
                        <div className="filterOptions">
                            <div onClick={resetFilters} className="arrow prev" />
                            <h4 onClick={toggleVersions} className="filterNameSelect">Versions</h4>
                        </div>
                        {/* VERSIONS (allProductsFilter) */}
                        {modelsRender ?
                            <div className="scrollable-content">
                                {models.map((modelBrand) => (
                                    <div key={modelBrand.brandId} className="brandModels">
                                        {console.log(modelBrand)}
                                        <div
                                            className={`filterModlesBrandName${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                            onClick={() => { toggleBrand(modelBrand.brandId) }
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
                                                        toggleModel(modelsNames.name)
                                                        handleDivClick(modelsNames.name)
                                                    })}>
                                                        <p htmlFor={generateCheckboxId(modelsNames.name)} className="modelNameFilter">{modelsNames.name}</p>
                                                    </div>
                                                ))
                                                : null}
                                        </div>
                                    </div>
                                ))}
                            </div> : null}
                        {/* VERSIONS (brandProduct) */}
                        {brandsModelsRender ?
                            <div className="scrollable-content">
                                {brandsModels.map((modelBrand) => (
                                    <div key={modelBrand.id} className="brandModels">
                                        <div
                                            className={`filterModlesBrandName${expandedBrands[modelBrand.id] ? 'expanded' : ''}`}
                                            onClick={() => { toggleBrand(modelBrand.id) }

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
                {!(brandsActive || modelsActive || bodyCarActive || versionsActive) && (
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