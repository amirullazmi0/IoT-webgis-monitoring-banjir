import react, { useEffect, useState, useRef } from 'react';
import '../../../css/map.css';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import the leaflet library
import customIcon from '../../../../public/img/marker2.png';
import axios from 'axios';

const customMarkerIcon = new L.Icon({
    iconUrl: customIcon,
    iconSize: [40, 40], // Set the dimensions of your custom icon
    iconAnchor: [40 / 2, 40], // Adjust the anchor point if needed
});

const CardKoordinat = ({ base_url }) => {
    const mapRef = useRef(null);
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [position, setPosition] = useState()
    const [navigasi, setNavigasi] = useState('sensor1')
    const [loading, setLoading] = useState(false)
    const [zoom] = useState(12);
    const [API_KEY] = useState('YGBPAuY7utv2Y7SgHp2N');
    const layer = [
        { name: 'Standar', kode: 'https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=' + API_KEY },
        { name: 'osm', kode: 'https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=' + API_KEY },
        { name: 'satelit', kode: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + API_KEY },
        // { name: 'topo', kode: 'https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=' + API_KEY }
    ]
    const [tile, setTile] = useState(layer[0].kode)

    function OnCLickMap() {
        const map = useMapEvents({
            click: () => {
                map.locate()
            },
            preclick: (e) => {
                console.log('location found:', e.latlng)
                setLatitude(e.latlng.lat)
                setLongitude(e.latlng.lng)
                setPosition([e.latlng.lat, e.latlng.lng])
                map.flyTo(e.latlng)
            }

        })
        return null
    }

    const getDataKoordinat = async () => {
        try {
            const response = await axios.get(`${base_url}/koordinat/${navigasi}`)
            if (response.data.koordinat) {
                setLatitude(response.data.koordinat.lat)
                setLongitude(response.data.koordinat.lng)
                setPosition([response.data.koordinat.lat, response.data.koordinat.lng])
            }
        } catch (error) {

        }
    }

    const handleUpdateKoordinat = async () => {
        try {
            const response = await axios(`${base_url}/koordinat/update/${navigasi}`, {
                method: 'post',
                data: {
                    latitude: latitude,
                    longitude: longitude
                },
            })
            if (response.data.success == true) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                }, 5000)
            }
        } catch (error) {

        }
    }


    const renderPopUp = () => {
        return (
            <div className="grid grid-cols-7 w-52">
                {/* Name */}
                <div className="col-span-2">
                    Sensor
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-4">
                    {`${navigasi}`}
                </div>

                {/* LAT */}
                <div className="col-span-2">
                    Lat
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-4">
                    {`${latitude}`}
                </div>

                {/* LNG */}
                <div className="col-span-2">
                    Lng
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-4">
                    {`${longitude}`}
                </div>
            </div>
        )
    }

    const handleNavigasi = async (e) => {
        setNavigasi(e)
        try {
            const response = await axios.get(`${base_url}/koordinat/${e}`)
            if (response.data.koordinat) {
                setLatitude(response.data.koordinat.lat)
                setLongitude(response.data.koordinat.lng)
                setPosition([response.data.koordinat.lat, response.data.koordinat.lng])
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataKoordinat()
    }, [])
    return (
        <div className='block rounded-lg lg:p-4 '>
            <div className="card bg-white border shadow-lg overflow-hidden">
                <div className="z-[5] flex uppercase text-xl font-bold mt-7 bg-white text-center justify-center p-2 shadow-lg">
                    Koordinat Sensor
                </div>
            </div>
            <div className="card border rounded-lg shadow-lg overflow-hidden mt-4">
                <div className="w-full">
                    <div className="aspect-square h-full flex justify-center items-center">
                        {position ?
                            <MapContainer
                                center={position}
                                zoom={zoom}
                                ref={mapRef}
                                className='map'
                                zoomControl={false}
                            >
                                <OnCLickMap />
                                <TileLayer
                                    url={tile}
                                    attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
                                />
                                <Marker icon={customMarkerIcon} position={position}>
                                    <Popup >{renderPopUp()}</Popup>
                                </Marker>
                            </MapContainer>
                            :
                            <span className="loading loading-ring loading-lg"></span>
                        }
                    </div>
                </div>
            </div>
            <div className="card rounded-lg border shadow-lg overflow-hidden mt-4">
                <div className="card-body">
                    {loading == true &&
                        <div className="flex">
                            <div className="card shadow-md w-full bg-yellow-100">
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        Update Koordinat Berhasil
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex justify-center">
                        <div className="btn-group btn-group-horizontal">
                            <button onClick={() => handleNavigasi('sensor1')} className={`btn btn-sm  ${navigasi === `sensor1` ? `btn-warning` : `btn-warning btn-outline`}`}>Sensor 1</button>
                            <button onClick={() => handleNavigasi('sensor2')} className={`btn btn-sm  ${navigasi === `sensor2` ? `btn-warning` : `btn-warning btn-outline`}`}>Sensor 2</button>
                            <button onClick={() => handleNavigasi('sensor3')} className={`btn btn-sm  ${navigasi === `sensor3` ? `btn-warning` : `btn-warning btn-outline`}`}>Sensor 3</button>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-2">
                        <div className="">
                            <label className='text-xs' htmlFor="">Latitude</label>
                            <input value={latitude} onChange={(e) => setLatitude(e.target.value)} type="text" placeholder="Latitude" className="input input-bordered input-accent w-full" />
                        </div>
                        <div className="">
                            <label className='text-xs' htmlFor="">Longitude</label>
                            <input value={longitude} onChange={(e) => setLongitude(e.target.value)} type="text" placeholder="Longitude" className="input input-bordered input-accent w-full" />
                        </div>
                    </div>
                    <div className="m-2">
                        <hr />
                    </div>
                    <button onClick={() => handleUpdateKoordinat()} className="btn btn-sm btn-accent text-white">
                        Update Koordinat
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardKoordinat