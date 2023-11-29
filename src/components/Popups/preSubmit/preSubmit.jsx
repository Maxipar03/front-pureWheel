import React, { useEffect, useState } from 'react'
import "./preSubmit.css";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchApi } from "../../../modules/mainModules";
import appInfo from "../../../modules/appInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function addPopup(props) {

    const {id} = useParams()

    const closePopup = () => {
        props.setTrigger(false)
    }

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


    const handleCarSubmit = () => {
        console.log(props.data)
        const newData = new FormData();
        // Color
        newData.append('Color', props.data.Color)
        // Images
        if (props.typeUpdate) {
            props.data.oldImages.forEach(image => {
                newData.append("oldImages", image);
            })
            props.data.newImages.forEach(image => {
                newData.append("productFile", image);
            })
            props.data.removeImages.forEach(image => {
                newData.append("removeImages", image);
            })
        } else {
            props.data.Images.forEach(image => { newData.append("productFiles", image); })
        }
        // Brand
        newData.append('Brand', props.data.Brand)
        // Model
        newData.append('Model', props.data.Model)
        // BodyCar
        newData.append('BodyCar', props.data.Body)
        // Transmission
        newData.append('Transmission', props.data.Transmission)
        // Price
        newData.append('Price', props.data.Price)
        // Description
        newData.append('Description', props.data.Description)
        // Discount
        newData.append('Discount', props.data.Discount)
        // Kilometers
        newData.append('Kilometers', props.data.Kilometers)
        // Year
        newData.append('Year', props.data.Year)
        // Version
        newData.append('Version', props.data.Version)
        // Damage
        newData.append('Damage', props.data.Damage)
        // Gasoline
        newData.append('Gasoline', props.data.Gasoline)
        // Engine
        newData.append('Engine', props.data.Engine)

        const permanentToken = localStorage.getItem('token');
        const token = sessionStorage.getItem('token');
        const headers = {}
        if (permanentToken) headers.authorization = permanentToken
        if (token) headers.authorization = token
        if (props.typeUpdate) {
            fetchApi(`${appInfo.root}/cars/update/${id}`, {
                method: 'PUT',
                // headers,
                body: newData,
            }, (resolve, reject) => {
                if (reject) { console.log(reject); } else {
                    window.location.href = `/products/detail/${resolve.data.id}`
                }
            });
        } else {
            fetchApi(`${appInfo.root}/cars/create`, {
                method: 'POST',
                headers,
                body: newData,
            }, (resolve, reject) => {
                if (reject) { console.log(reject); } else {
                    window.location.href = `/products/detail/${resolve.data.id}`
                }
            });
        }
    }


    return (props.trigger ?

        <div className="scp-main-choose" onClick={closePopup}>
            <div className="scp-choose-main-div" onClick={(e) => e.stopPropagation()}>
                <div className="scp-main-div-top-sell-car">
                    <div className='sellCarPropsInfoImagesBox'>
                        <div className='sellCarPropsInfoImagesContainer'>
                            {props.data && props.data.Images.map((image, index) => (
                                <div key={index} className="sellCarImageProps">
                                    <img src={props.typeUpdate ? `${appInfo.root}/images/cars/user_${props.data.User_id}/${image}` : URL.createObjectURL(image)} alt={`Image ${index}`} />
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='sellCarPropsInfoContainer'>
                        <div className='sellCarPropsInfoRow1'>
                            <div className='sellCarPropsInfo'>
                                <h1>Year</h1>
                                <h3>{props.data && props.data.Year}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <h1>Body</h1>
                                <h3>{props.data && props.data.Body}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <h1>Brand</h1>
                                <h3>{props.data && props.data.Brand}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <h1>Model</h1>
                                <h3>{props.data && props.data.Model}</h3>
                            </div>
                            {props.data && props.data.Version ? (
                                <div className='sellCarPropsInfo' >
                                    <h1>Version</h1>
                                    <h3>{props.data && props.data.Vers}</h3>
                                </div>
                            ) : null}
                            <div className='sellCarPropsInfo'>
                                <h1>Desciption</h1>
                                <h3>{props.data && props.data.Description}</h3>
                            </div>
                        </div>
                        <div className='sellCarPropsInfoRow2'>
                            <div className='sellCarPropsInfo'>
                                <h1>Color</h1>
                                <h3>{props.data && props.data.Color}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <h1>Engine</h1>
                                <h3>{props.data && props.data.Engine}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <h1>Kilometers</h1>
                                <h3>{props.data && props.data.Kilometers}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <h1>Gasoline</h1>
                                <h3>{props.data && props.data.Gasoline}</h3>
                            </div>
                            <div className='sellCarPropsInfo'>
                                <div className='sellCarPropsInfoPrice'>
                                    <h1>price</h1>
                                    <h3>{props.data && props.data.Price}</h3>
                                    {props.data && props.data.Discount ? (
                                        <h3>{props.data && props.data.Discount}</h3>
                                    ) :
                                        null
                                    }
                                </div>
                            </div>
                            {props.data && props.data.Damage ? (
                                <div className='sellCarPropsInfo' >
                                    <h1>Damage</h1>
                                    <h3>{props.data && props.data.Damage}</h3>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {props.typeUpdate ?
                        <div className="scp-advice-sell-car">
                            <h3>Do you want update your car?</h3>
                            <div className="scp-advice-button-sell-car">
                                <button className='scp-button-sell-car-cancel' onClick={closePopup}>Cancel</button>
                                <button onClick={() => { handleCarSubmit() }} className='scp-button-sell-car-submit'>Submit</button>
                            </div>
                        </div> :
                        <div className="scp-advice-sell-car">
                            <h3>Do you want sell your car?</h3>
                            <div className="scp-advice-button-sell-car">
                                <button className='scp-button-sell-car-cancel' onClick={closePopup}>Cancel</button>
                                <button onClick={() => { handleCarSubmit() }} className='scp-button-sell-car-submit'>Submit</button>
                            </div>
                        </div>
                    }
                </div>
                <div className="scp-main-div-bottom">
                    {/* LIST OF DB COLORS FROM NEWEST TO OLDEST */}
                </div>

                <div className="scp-choose-info-div"></div>
            </div>
        </div>

        : null)

}
export default addPopup