import React from "react";
import "./filterProducts.css"


function filterProducts() {

    return (
        <div className="filterComponent">
            <div className="filterContainer">
                <h1>Filter</h1>
                <h1>Search Model</h1>
                <input className="inputSearch" placeholder="911 Turbo" type="text"></input>
                <div className="filterDate">
                    <h1>Year</h1>
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
                    <h1>KM</h1>
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
                <div className="filterBrands">
                    <h1>Brands</h1>
                    <select>
                        <option></option>
                    </select>
                </div>
                <div className="filterColor">
                    <h1>Color</h1>
                    <select>
                        <option></option>
                    </select>
                </div>
            </div>
        </div>
    )

}


export default filterProducts