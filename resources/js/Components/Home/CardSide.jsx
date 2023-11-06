import React, { useEffect, useState } from 'react'
import '../../../css/webgis.css';
import { Link } from '@inertiajs/react';
import axios from 'axios';

const CardSide = ({ sidebar, handle, socket, api, base_url }) => {
    const [iniData, setData] = useState([])
    const [allData, setAllData] = useState([])
    const handleSide = () => {
        handle(false)
        iniData()
        allData()
    }

    const getData = async () => {
        const data = await axios.get(`${base_url}/mindata/${api}`)
        setData(data.data.sensor)
    }


    const getAllData = async () => {
        const data = await axios.get(`${base_url}/alldata/${api}`)
        setAllData(data.data.sensor)
    }

    const renderAllData = () => {
        getAllData()
        window.my_modal_5.showModal()
    }
    useEffect(() => {
        getData()
    })
    return (
        <>
            <div className='card-side'>
                <div className={sidebar == true ? "card-item-on" : "card-item-off"}>
                    <div className="card-head">
                        Keterangan
                        <button className='btn btn-ghost btn-sm' onClick={() => handleSide()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="card-value">
                        <div className="value">{socket}</div>
                        <div className="besaran">cm</div>
                    </div>
                    <div className="card-siaga">
                        <p>Kondisi : </p>
                        {socket <= 10 &&
                            <div className="cr-green">
                                <p>
                                    Rendah
                                </p>
                            </div>
                        }
                        {socket > 10 && socket <= 20 &&
                            < div className="cr-yellow">
                                <p>
                                    Sedang
                                </p>
                            </div>
                        }
                        {socket > 20 &&
                            <div className="cr-red">
                                <p>
                                    Tinggi
                                </p>
                            </div>
                        }
                    </div>
                    <div className="card-history">
                        <div className="head">
                            Histori
                        </div>
                        <div className="body">
                            <div className="overflow-x-auto">
                                <table className="table table-sm">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-center
                                        '>
                                            <th></th>
                                            <th>Tinggi</th>
                                            <th>Tanggal</th>
                                            <th>Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {iniData && iniData.map((item, index) => {
                                            const date = new Date(item.created_at)
                                            const tanggal = date.getDate();
                                            const bulan = date.getMonth() + 1;
                                            const tahun = date.getFullYear();
                                            const jam = date.getHours();
                                            const menit = date.getMinutes();
                                            const waktu = `${jam}:${menit}`
                                            return (
                                                <tr className='text-xs text-center' key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>
                                                        <div className='w-20'>{`${item.value} cm`}</div>
                                                    </td>
                                                    <td>
                                                        <div className="w-32">
                                                            {`${tanggal} - ${bulan} - ${tahun}`}
                                                        </div>
                                                    </td>
                                                    <td>{waktu}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* You can open the modal using ID.showModal() method */}
                        <button className="footer" onClick={renderAllData}>
                            <small>Lihat semua data</small>
                        </button>
                        <dialog id="my_modal_5" className="modal">
                            <div className="modal-box bg-white w-11/12">
                                <div className="flex justify-between shadow-lg rounded-lg mb-4 items-center p-3">
                                    <h3 className="font-bold text-lg">{api}</h3>
                                    <form method="dialog">
                                        {/* if there is a button, it will close the modal */}
                                        <button className="btn btn-ghost btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                                <div className="h-[50vh] overflow-y-scroll overflow-x-auto">
                                    {allData ?
                                        <div className="">
                                            <table className="table table-sm">
                                                {/* head */}
                                                <thead>
                                                    <tr className='text-center
                                        '>
                                                        <th>No</th>
                                                        <th>Tinggi</th>
                                                        <th>Tanggal</th>
                                                        <th>Waktu</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* row 1 */}
                                                    {allData.map((item, index) => {
                                                        const date = new Date(item.created_at)
                                                        const tanggal = date.getDate();
                                                        const bulan = date.getMonth() + 1;
                                                        const tahun = date.getFullYear();
                                                        const jam = date.getHours();
                                                        const menit = date.getMinutes();
                                                        const waktu = `${jam}:${menit}`
                                                        return (
                                                            <tr className='text-xs text-center' key={index}>
                                                                <th>{index + 1}</th>
                                                                <td >
                                                                    {`${item.value} cm`}
                                                                </td>
                                                                <td>
                                                                    {`${tanggal} - ${bulan} - ${tahun}`}
                                                                </td>
                                                                <td>{waktu}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className="p-5">
                                            <span className="loading loading-spinner loading-lg"></span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div >
            </div >
        </>
    )
}

export default CardSide