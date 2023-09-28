import React, { useEffect, useState } from "react";
import "./filterProducts.css"
import { fetchApi } from "../../modules/mainModules"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';;
import appInfo from "../../modules/appInfo";
import banner from "../../../public/ImageTestbannerfilter.jpg"
// import { loadConfigFromFile } from "vite";


function filterProducts(props) {
    const [models, setModels] = useState([])

    const [modelsRender, setModelsRender] = useState(false)

    const [expandedBrands, setExpandedBrands] = useState({});

    const [selectedBrands, setSelectedBrands] = useState([]);

    const toggleBrand = (brandId) => {
        setExpandedBrands((prevExpandedBrands) => ({
            ...prevExpandedBrands,
            [brandId]: !prevExpandedBrands[brandId],
        }));
    };
  
    const toggleBrand2 = (brandId) => {
        // Copiamos el array de marcas seleccionadas para evitar la mutación del estado
        const updatedSelectedBrands = [...selectedBrands];
        
        // Si la marca ya está en la lista de seleccionadas, la eliminamos; de lo contrario, la agregamos
        if (updatedSelectedBrands.includes(brandId)) {
            updatedSelectedBrands.splice(updatedSelectedBrands.indexOf(brandId), 1);
        } else {
            updatedSelectedBrands.push(brandId);
        }

        // Actualizamos el estado con las marcas seleccionadas actualizadas
        setSelectedBrands(updatedSelectedBrands);
    };



    //     const [brandFilter, setBrandFilter] = useState('')
    //     const [modelFilter, setModelFilter] = useState('')
    //     const [yearFromFilter, setYearFromFilter] = useState('')
    //     const [yearToFilter, setYearToFilter] = useState('')
    //     const [kilometersFromFilter, setKilometersFromFilter] = useState('')
    //     const [kilometersToFilter, setKilometersToFilter] = useState('')
    //     const [priceFromFilter, setPriceFromFilter] = useState('')
    //     const [priceToFilter, setPriceToFilter] = useState('')
    //     const [colorFilter, setColorFilter] = useState('')
    //     const [onSaleFilter, setOnSaleFilter] = useState('')


    useEffect(() => {
        setModels(props.models)
    }, [props.models])

    useEffect(() => {
        if (models.length > 0) setModelsRender(true)
    }, [models])

    console.log(models);

    return (
        <div className="filterComponent">
            <div className="filterContainer">
                <h2 className="filterTitle">Filter</h2>
                {/* YEAR */}
                <div className="filterDate">
                    <h4 className="filterName">Year</h4>
                    <div className="dateContainer">
                        <div className="dateFrom">
                            <label>From</label>
                            <input placeholder="2007" className="inputYear" type="number"></input>
                        </div>
                        <div className="dateTo">
                            <label>To</label>
                            <input className="inputYear" placeholder="2024" type="number"></input>
                        </div>
                    </div>
                </div>
                <div className="filterKM">
                    <h4 className="filterName">Kilometres</h4>
                    <div className="kmContainer">
                        <div className="kmFrom">
                            <label>From</label>
                            <input placeholder="1000" className="inputKM" type="number"></input>
                        </div>
                        <div className="kmTo">
                            <label>To</label>
                            <input type="number" placeholder="20000" className="inputKM"></input>
                        </div>
                    </div>
                </div>
                <div className="filterKM">
                    <h4 className="filterName">Price</h4>
                    <div className="priceContainer">
                        <div className="priceFrom">
                            <label>From</label>
                            <input placeholder="1000" className="inputPrice" type="number"></input>
                        </div>
                        <div className="priceTo">
                            <label>To</label>
                            <input type="number" placeholder="20000" className="inputPrice"></input>
                        </div>
                    </div>
                </div>
                <div className="filterColor">
                    <h4 className="filterName">Color</h4>
                    <div>
                        <span className="circle white"></span>
                        <span className="circle black"></span>
                        <span className="circle red"></span>
                        <span className="circle orange"></span>
                        <span className="circle gray"></span>
                        <span className="circle blue"></span>
                    </div>
                </div>
                <div className="filterTrasmision">
                <select className="inputPrice">
                <option disabled selected className="puto">Select Option</option>
                <option>Manual</option>
                <option>Automatic</option>
                </select>
                </div>
                {/*BODYCAR*/}
                {props.bodyCar ? <div>
                    <h4 className="filterName">BodyCar</h4>
                    <div className="modelsInputDiv">
                        <div className="scrollable-content">
                            {props.bodyCar.map((bodyCar) => (
                              <div
                              key={bodyCar.id}
                              className={`modelDivCheckbox`}
                          >
                              <input type="checkbox" className="checkBoxBrand" id="" />
                              <p>{bodyCar.name}</p>
                          </div>
                            ))}
                        </div>
                    </div>
                </div> : null}
                {/* BRANDS */}
                {props.brands ? <div>
                    <h4 className="filterName">Brand</h4>
                    <div className="modelsInputDiv">
                        <div className="scrollable-content">
                            {props.brands.map((brand) => (
                              <div
                              key={brand.id}
                              className={`modelDivCheckbox ${selectedBrands.includes(brand.id) ? 'selected-brand' : ''}`}
                              onClick={() => toggleBrand2(brand.id)}
                          >
                              <input type="checkbox" className="checkBoxBrand" id="" />
                              <p>{brand.name}</p>
                              <img className="logoBrandFilter" src={`${appInfo.root}/images/brands/${brand.logo}`}/>
                          </div>
                            ))}
                        </div>
                    </div>

                </div> : null}
                {/* MODELS */}
                <h4 className="filterName">Model</h4>
                <div className="modelsInputDiv">
                    {modelsRender ?
                        <div className="scrollable-content">
                            {models.map((modelBrand) => (
                            <div className="brandModels">
                            <div
                                className={`filterModlesBrandName${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                                onClick={() => {toggleBrand(modelBrand.brandId);}
                                }
                            >
                                <p>{modelBrand.brandName}</p>
                                <FontAwesomeIcon
                    icon={expandedBrands[modelBrand.brandId] ?faAngleUp : faAngleDown}
                    className={`arrow-icon${expandedBrands[modelBrand.brandId] ? 'expanded' : ''}`}
                />
                            </div>
                            <div className={`filterModelsNames${expandedBrands[modelBrand.brandId] ? 'expanded' : 'hideOptions'}`}>
                                {modelBrand.models
                                    ? modelBrand.models.map((modelsNames) => (
                                          <div key={modelsNames.id} className="filterModelsNameDiv">
                                              <input type="checkbox" name="" id="" />
                                              <p className="modelNameFilter">{modelsNames.name}</p>
                                          </div>
                                      ))
                                    : null}
                            </div>
                            </div>
                            ))}
                        </div> : null}
                </div>
                <div className="onSaleFilter">
                    <h4>On sale</h4>
                    <div className="checkbox-wrapper-64">
                        <label className="switch">
                            <input
                                type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default filterProducts