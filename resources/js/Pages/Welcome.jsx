import React, { useEffect, useRef, useState } from 'react'
import { Head } from '@inertiajs/react';

import '../../css/map.css';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, Circle, CircleMarker } from 'react-leaflet';

import Navbar from '@/Components/Home/Navbar'
import CardLayerMap from '@/Components/Home/CardLayerMap';

import 'leaflet/dist/leaflet.css';
import CardPopUp from '@/Components/Home/cardPopUp';
import CardSide from '@/Components/Home/CardSide';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { latest } from 'maplibre-gl';

import L from 'leaflet'; // Import the leaflet library
import customIcon from '../../../public/img/marker2.png';
import axios from 'axios';

const customMarkerIcon = new L.Icon({
    iconUrl: customIcon,
    iconSize: [50, 50], // Set the dimensions of your custom icon
    iconAnchor: [50 / 2, 50], // Adjust the anchor point if needed
});

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'b509699f6109a8a7fec0',
    cluster: 'ap1',
    forceTLS: true
});

export default function Welcome(props) {
    const mapRef = useRef();
    const base_url = props.base_url
    const [sidebar, setSidebar] = useState(false)
    const [area, setArea] = useState(false)
    const [marker, setMarker] = useState(true)
    const [position, setPosition] = useState([0.8582213371818204, 112.9331907508798])
    const [zoom] = useState(11);
    const [API_KEY] = useState('YGBPAuY7utv2Y7SgHp2N');

    const [socketSensor, setSocketSensor] = useState(null)
    const [sensor1, setSensor1] = useState(0)
    const [sensor2, setSensor2] = useState(0)
    const [sensor3, setSensor3] = useState(0)

    window.Echo.channel('my-channel').listen(".my-event", (event) => {
        setSocketSensor(event.message)
    });

    const layer = [
        { name: 'Standar', kode: 'https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=' + API_KEY },
        { name: 'osm', kode: 'https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=' + API_KEY },
        { name: 'satelit', kode: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + API_KEY },
        // { name: 'topo', kode: 'https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=' + API_KEY }
    ]

    const [tile, setTile] = useState(layer[0].kode)

    const handleLayer = (event) => {
        layer.map((m) => {
            m.name == event &&
                setTile(m.kode)
        })
    }
    // saasdasd

    const [koordinatSensor1, setKoordinatSensor1] = useState()
    const [koordinatSensor2, setKoordinatSensor2] = useState()
    const [koordinatSensor3, setKoordinatSensor3] = useState()
    const getDataKoordinat = async () => {
        try {
            const response = await axios.get(`${base_url}/allkoordinat`)
            if (response.data.koordinat) {
                setKoordinatSensor1([response.data.koordinat[0].lat, response.data.koordinat[0].lng])
                setKoordinatSensor2([response.data.koordinat[1].lat, response.data.koordinat[1].lng])
                setKoordinatSensor3([response.data.koordinat[2].lat, response.data.koordinat[2].lng])
                // setPosition([response.data.koordinat[0].lat, response.data.koordinat[0].lng])
            }
        } catch (error) {

        }
    }
    const [api, setApi] = useState()
    const [sideSocket, setSideSocket] = useState()
    const handleMarkerClick = (e, b) => {
        setPosition(e)
        setSidebar(true)
        setApi(b)
        if (b == 'sensor1') {
            if (!socketSensor) {
                setSideSocket(sensor1)
            } else {
                if (socketSensor.name == b) {
                    setSideSocket(socketSensor.value)
                } else {
                    setSideSocket(sensor1)
                }
            }
        }
        if (b == 'sensor2') {
            if (!socketSensor) {
                setSideSocket(sensor2)
            } else {
                if (socketSensor.name == b) {
                    setSideSocket(socketSensor.value)
                } else {
                    setSideSocket(sensor2)
                }
            }
        }
        if (b == 'sensor3') {
            if (!socketSensor) {
                setSideSocket(sensor3)
            } else {
                if (socketSensor.name == b) {
                    setSideSocket(socketSensor.value)
                } else {
                    setSideSocket(sensor3)
                }
            }
        }

    }

    const renderSidebar = (e) => {
        setSidebar(e)
    }
    const renderArea = (e) => {
        setArea(e)
    }
    const renderMarker = (e) => {
        setMarker(e)
    }

    useEffect(() => {
        if (props.sensor1) {
            setSensor1(props.sensor1.value)
        }
        if (props.sensor2) {
            setSensor2(props.sensor2.value)
        }
        if (props.sensor3) {
            setSensor3(props.sensor3.value)
        }
        getDataKoordinat()
    }, [])

    return (
        <>
            <Head title='Dashboard' />
            <Navbar />
            <CardSide base_url={base_url} socket={sideSocket} api={api} sidebar={sidebar} handle={renderSidebar} />
            <CardLayerMap layer={layer} area={renderArea} marker={renderMarker} handle={handleLayer} />
            <div className="border-map">
                {koordinatSensor1 ?
                    <MapContainer
                        center={position}
                        zoom={zoom}
                        ref={mapRef}
                        className='map'
                        zoomControl={false}
                    >
                        <TileLayer
                            url={tile}
                            attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
                        />

                        {marker == true && koordinatSensor1 ?
                            <>
                                <Marker
                                    position={koordinatSensor1}
                                    icon={customMarkerIcon}
                                    eventHandlers={{
                                        click: () => { handleMarkerClick(koordinatSensor1, 'sensor1') },
                                    }}
                                >
                                    <Popup interactive>
                                        <CardPopUp value={(socketSensor != null && socketSensor.name == 'sensor1') ? socketSensor.value : sensor1} />
                                    </Popup>
                                </Marker>
                                <Marker
                                    position={koordinatSensor2}
                                    icon={customMarkerIcon}
                                    eventHandlers={{
                                        click: () => { handleMarkerClick(koordinatSensor2, 'sensor2') },
                                    }}
                                >
                                    <Popup>
                                        <CardPopUp value={(socketSensor != null && socketSensor.name == 'sensor2') ? socketSensor.value : sensor2} />
                                    </Popup>
                                </Marker>
                                <Marker
                                    position={koordinatSensor3}
                                    icon={customMarkerIcon}
                                    eventHandlers={{
                                        click: () => { handleMarkerClick(koordinatSensor3, 'sensor3') },
                                    }}
                                // icon={customIcon}
                                >
                                    <Popup className='mb-7'>
                                        <CardPopUp value={(socketSensor != null && socketSensor.name == 'sensor3') ? socketSensor.value : sensor3} />
                                    </Popup>
                                </Marker>
                            </>
                            :
                            ''
                        }
                        {area == true ?
                            <>
                                <Circle
                                    center={koordinatSensor1}
                                    pathOptions={{
                                        // color: 'rgb(255, 187, 0)',
                                        // fillColor: 'rgb(255, 187, 0)',
                                        stroke: false,
                                        fillOpacity: 0.6
                                    }}
                                    radius={1200}
                                />
                                <Circle
                                    center={koordinatSensor2}
                                    pathOptions={{
                                        // color: 'rgb(0, 161, 8)',
                                        // fillColor: 'rgb(0, 161, 8)',
                                        stroke: false,
                                        fillOpacity: 0.6
                                    }}
                                    radius={1200}
                                />
                                <Circle
                                    center={koordinatSensor3}
                                    pathOptions={{
                                        // color: 'rgb(240, 13, 13)',
                                        // fillColor: 'rgb(240, 13, 13)',
                                        stroke: false,
                                        fillOpacity: 0.6
                                    }}
                                    radius={1200}
                                />
                            </>
                            :
                            ''
                        }
                    </MapContainer>
                    :
                    <div className="flex justify-center items-center h-full w-full bg-blue-100">
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                }
            </div >
        </>
    )
}
