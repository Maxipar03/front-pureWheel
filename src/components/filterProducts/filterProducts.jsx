import React, { useEffect, useState } from "react";
import "./filterProducts.css"
import { fetchApi } from "../../modules/mainModules";
import appInfo from "../../modules/appInfo";
// import { loadConfigFromFile } from "vite";


function filterProducts(props) {
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
                {/* BRANDS */}
                {/* {props.page === 'allProducts' ? <div>
                    <h4 className="filterName">Brand</h4><p></p>
                    <div className="modelsInputDiv">
                        <div className="scrollable-content">
                            {allBrands.map((brand) => (
                                <div key={brand.id} className="modelDivCheckbox">
                                    <input type="checkbox" name="" id="" />
                                    <p>{brand.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div> : null} */}
                {/* MODELS */}
                <h4 className="filterName">Model</h4>
                <div className="modelsInputDiv">
                    {/* {allModels.length > 0 ?
                        <div className="scrollable-content">
                            {allModels.map((model) => (
                                <p>{model.data.id}</p>
                                // <div key={model.data.id} className="modelDivCheckbox">
                                //     <input type="checkbox" name="" id="" />
                                //     <p>{model.data.name}</p>
                                // </div>
                            ))}
                        </div> : 
                        null} */}
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