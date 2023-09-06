import React, { useState } from 'react'
import '../../../css/webgis.css';

const CardLayerMap = ({ layer, handle, area, marker }) => {
    const [checked, setChecked] = useState(layer[0].name)
    const [checkedMarker, setCheckedMarker] = useState(true)
    const [checkedArea, setCheckedArea] = useState(false)

    const handleChange = (event) => {
        setChecked(event)
        handle(event)
    };
    const handleArea = () => {
        checkedArea == true ?
            setCheckedArea(false)
            :
            setCheckedArea(true)
    };
    const handleMarker = () => {
        checkedMarker == true ?
            setCheckedMarker(false)
            :
            setCheckedMarker(true)
    };
    area(checkedArea)
    marker(checkedMarker)

    const siaga = [
        { value: "0 - 10 cm" },
        { value: "11 - 20 cm" },
        { value: "> 20 cm" },
    ]
    return (
        <>
            <div className="cardMapLayer">
                <div className="card-item">
                    <h2>Layer Peta</h2>
                    <ul>
                        {layer.map((m, index) => (
                            <div key={index} className='layerRadio'>
                                <input
                                    type="checkbox"
                                    className='checkbox accent-black mt-2'
                                    checked={checked == m.name ? true : false}
                                    onChange={() => handleChange(m.name)}
                                />
                                <li className='mt-2' key={m.name}>{m.name}</li>
                            </div>
                        ))}
                    </ul>
                    <hr className='mt-3 mb-3' />
                    <h2>Shape</h2>
                    <ul className=''>
                        <div className='layerRadio'>
                            <input
                                type="checkbox"
                                className='checkbox accent-black mt-2'
                                checked={checkedMarker == true ? true : false}
                                onClick={() => handleMarker()}
                            />
                            <li className='mt-2'>Titik</li>
                        </div>
                        <div className='layerRadio'>
                            <input
                                type="checkbox"
                                className='checkbox accent-black mt-2'
                                checked={checkedArea == true ? true : false}
                                onClick={() => handleArea()}
                            />
                            <li className='mt-2'>Area</li>
                        </div>
                    </ul>
                    <hr className='mt-3 mb-3' />
                    <h2>Legenda</h2>
                    <ul className=''>
                        <div className='flex mt-2 gap-2'>
                            <div className="cr-green"></div>
                            <p>{siaga[0].value}</p>
                        </div>
                        <div className='flex mt-2 gap-2'>
                            <div className="cr-yellow"></div>
                            <p>{siaga[1].value} </p>
                        </div>
                        <div className='flex mt-2 gap-2'>
                            <div className="cr-red"></div>
                            <p>{siaga[2].value}</p>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CardLayerMap