import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import 'moment/locale/id';
import { router } from '@inertiajs/react';
const CardData = ({ base_url }) => {
    const [navigation, setNavigation] = useState('sensor1')
    const [sensor, setSensor] = useState()
    const [idDelete, setIdDelete] = useState(false)
    const [alertDelete, setAlertDelete] = useState(false)
    const [FlashDelete, setFlashDelete] = useState(false)

    const pagination = 10
    const [prevPagination, setPrevPagination] = useState(0)
    const [nextPagination, setNextPagination] = useState(1)

    const handlePrevPagination = () => {
        if (prevPagination > 0) {
            setPrevPagination(prevPagination - 1)
            setNextPagination(nextPagination - 1)
        }
    }

    const handleNextPagination = () => {
        if (sensor.length > nextPagination) {
            setPrevPagination(prevPagination + 1)
            setNextPagination(nextPagination + 1)
        }
    }
    const handleNavigation = (e) => {
        setSensor()
        setNavigation(e)
        setPrevPagination(0)
        setNextPagination(1)
    }

    const handleAlertDelete = (e) => {
        setAlertDelete(true)
        setIdDelete(e)
    }

    const handleCancelAlertDelete = () => {
        setAlertDelete(false)
        setIdDelete()
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        });
    }
    const handleDelete = async () => {
        setAlertDelete(false)
        scrollToTop()
        try {
            const response = await axios.post(`${base_url}/sensor/delete/${idDelete}`)
            if (response.data.success == true) {
                setFlashDelete(true)
                setIdDelete()
                getSensor()
                setTimeout(() => {
                    setFlashDelete(false)
                }, 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSensor = async () => {
        try {
            const response = await axios.get(`${base_url}/alldata/${navigation}`)
            setSensor(response.data.sensor)
        } catch (error) {

        }
    }

    function exportTableToExcel(e, x) {
        var filename = `table-data-${x}`
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(e);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Specify file name
        filename = filename ? filename + '.xls' : 'excel_data.xls';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }
    }

    const renderAlert = () => {
        return (
            <React.Fragment>
                <div className={`fixed top-10 left-10 flex justify-center z-[50] ease-in-out ${alertDelete == true ? `translate-y-[0vh]` : `translate-y-[-30vh]`} transition-[] `}>
                    <div className="card bg-yellow-100 lg:w-[40vw] w-[80vw] shadow-lg ">
                        <div className="card-body">
                            <div className="flex justify-between">
                                Yakin untuk menghapus data ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div className="flex justify-end mt-4 gap-2">
                                <button onClick={() => handleDelete()} className="btn btn-accent btn-sm text-white">
                                    Ya
                                </button>
                                <button onClick={() => handleCancelAlertDelete(false)} className="btn btn-error btn-sm text-white">
                                    Tidak
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    useEffect(() => {
        getSensor()
    }, [navigation])
    return (
        <div className='block rounded-lg lg:p-4 '>
            {renderAlert()}
            <div className="card bg-white border shadow-lg overflow-hidden">
                <div className="flex uppercase text-xl font-bold mt-7 bg-white text-center justify-center p-2 shadow-lg">
                    List Data Sensor
                </div>
                <div className="card-body">
                    {FlashDelete === true &&
                        <div className="flex justify-center w-full mb-4">
                            <div className="card shadow-lg bg-blue-100 w-full">
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <span>
                                            Berhasil menghapus data
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex gap-1 justify-center">
                        <button onClick={() => handleNavigation('sensor1')} className={`btn btn-sm ${navigation === `sensor1` && `btn-accent text-white`}`}>
                            Sensor 1
                        </button>
                        <button onClick={() => handleNavigation('sensor2')} className={`btn btn-sm ${navigation === `sensor2` && `btn-accent text-white`}`}>
                            Sensor 2
                        </button>
                        <button onClick={() => handleNavigation('sensor3')} className={`btn btn-sm ${navigation === `sensor3` && `btn-accent text-white`}`}>
                            Sensor 3
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => exportTableToExcel('data-sensor', `${navigation}`)} className="btn btn-wide btn-secondary btn-sm ">
                            Export Excel
                        </button>
                    </div>
                    <div className="m-4">
                        <hr />
                    </div>
                    <div id='table' className="grid">
                        {sensor ?
                            <React.Fragment>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr className='text-center'>
                                                <th></th>
                                                <th>Nilai</th>
                                                <th>Waktu</th>
                                                <th>Tanggal</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sensor.map((item, index) => {
                                                const tanggal = moment(item.created_at).format('DD MMMM YYYY');
                                                const waktu = moment(item.created_at).format('HH:mm');
                                                if ((prevPagination * pagination <= index) && (nextPagination * pagination > index)) {
                                                    return (
                                                        <tr className='text-center' key={index}>
                                                            <th>{index + 1}</th>
                                                            <td>{item.value}</td>
                                                            <td>{waktu}</td>
                                                            <td>{`${tanggal}`}</td>
                                                            <td>
                                                                <button onClick={() => handleAlertDelete(item.id)} className="btn btn-sm">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>

                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center">
                                    <div className="join">
                                        <a href={`#table`} onClick={() => handlePrevPagination()} className="join-item btn">«</a>
                                        <div className="join-item btn">{nextPagination}</div>
                                        <a href={`#table`} onClick={() => handleNextPagination()} className="join-item btn">»</a>
                                    </div>
                                </div>
                            </React.Fragment>
                            :
                            <div className="flex justify-center items-center w-full h-24">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        }
                    </div>
                    <div id='table-sxport' className="hidden">
                        {sensor &&
                            <React.Fragment>
                                <div className="overflow-x-auto">
                                    <table id={`data-sensor`} className="table">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>No</th>
                                                <th>Nilai</th>
                                                <th>Waktu</th>
                                                <th>Tanggal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sensor.map((item, index) => {
                                                const tanggal = moment(item.created_at).format('DD MMMM YYYY');
                                                const waktu = moment(item.created_at).format('HH:mm');
                                                return (
                                                    <tr className='text-center' key={index}>
                                                        <th>{index + 1}</th>
                                                        <td>{item.value}</td>
                                                        <td>{waktu}</td>
                                                        <td>{`${tanggal}`}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center">
                                    <div className="join">
                                        <a href={`#table`} onClick={() => handlePrevPagination()} className="join-item btn">«</a>
                                        <div className="join-item btn">{nextPagination}</div>
                                        <a href={`#table`} onClick={() => handleNextPagination()} className="join-item btn">»</a>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardData