import React, { useState } from 'react'
import '../../../css/webgis.css';
import { Link } from '@inertiajs/react';
Link
const CardSide = ({ sidebar, handle }) => {
    const handleSide = () => {
        handle(false)
    }
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
                        <div className="value">20</div>
                        <div className="besaran">cm</div>
                    </div>
                    <div className="card-siaga">
                        <p>Kondisi : </p>
                        <div className="cr-green">
                            <p>
                                Rendah
                            </p>
                        </div>
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
                                        <tr>
                                            <th></th>
                                            <th>Tinggi</th>
                                            <th>Waktu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>
                                            <th>1</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                        <tr>
                                            <th>2</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                        <tr>
                                            <th>3</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                        <tr>
                                            <th>4</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                        <tr>
                                            <th>5</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                        <tr>
                                            <th>6</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                        <tr>
                                            <th>7</th>
                                            <td>20</td>
                                            <td>Blue</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* You can open the modal using ID.showModal() method */}
                        <button className="footer" onClick={() => window.my_modal_5.showModal()}>
                            <small>Lihat semua data</small>
                        </button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Semua</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSide