import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CardCount = ({ base_url }) => {
    const [countSensor, setCountSensor] = useState()
    const getData = async () => {
        try {
            const response = await axios.get(`${base_url}/countSensor`)
            setCountSensor(response.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='block rounded-lg p-4'>
            <div className="head text-lg font-bold uppercase">
                Jumlah Data Sensor Per Titik
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 justify-center gap-4 mt-3">
                <div className="card shadow-lg bg-yellow-100">
                    <div className="card-body text-center">
                        <h1>Sensor 1</h1>
                        {countSensor ?
                            <div className="text-4xl text-center font-bold">{countSensor.sensor1}</div>
                            :
                            <div className="text-4xl text-center font-bold">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        }
                    </div>
                </div>
                <div className="card shadow-lg bg-green-100">
                    <div className="card-body text-center">
                        <h1>Sensor 2</h1>
                        {countSensor ?
                            <div className="text-4xl text-center font-bold">{countSensor.sensor2}</div>
                            :
                            <div className="text-4xl text-center font-bold">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        }
                    </div>
                </div>
                <div className="card shadow-lg bg-blue-100">
                    <div className="card-body text-center">
                        <h1>Sensor 3</h1>
                        {countSensor ?
                            <div className="text-4xl text-center font-bold">{countSensor.sensor3}</div>
                            :
                            <div className="text-4xl text-center font-bold">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        }
                    </div>
                </div>
                <div className="lg:hidden block card bg-transparent">
                    <div className="card-body text-center">
                        <div className="flex justify-center">
                            <img className={`h-20 w-20`} src="/img/marker2.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCount