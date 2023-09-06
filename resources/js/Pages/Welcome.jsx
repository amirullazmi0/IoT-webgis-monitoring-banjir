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

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'b509699f6109a8a7fec0',
    cluster: 'ap1',
    forceTLS: true
});

export default function Welcome(props) {
    const mapRef = useRef();
    const [sidebar, setSidebar] = useState(false)
    const [area, setArea] = useState(false)
    const [marker, setMarker] = useState(true)
    const [position, setPosition] = useState([-0.01745613099920127, 109.34030619134353])
    const [zoom] = useState(13);
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

    const handleMarkerClick = (e) => {
        setPosition(e)
        setSidebar(true)
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
    })


    return (
        <>
            <Head title='Dashboard' />
            <Navbar />
            <CardSide sidebar={sidebar} handle={renderSidebar} />
            <CardLayerMap layer={layer} area={renderArea} marker={renderMarker} handle={handleLayer} />
            <div className="border-map">
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

                    {marker == true ?
                        <>
                            <Marker
                                position={[-0.013507799364533998, 109.34150794692324]}
                                eventHandlers={{
                                    click: () => { handleMarkerClick([-0.013507799364533998, 109.34150794692324]) },
                                }}
                            >
                                <Popup>
                                    <CardPopUp value={(socketSensor != null && socketSensor.name == 'sensor1') ? socketSensor.value : sensor1} />
                                </Popup>
                            </Marker>
                            <Marker
                                position={[-0.015396, 109.308033]}
                                eventHandlers={{
                                    click: () => { handleMarkerClick([-0.015396, 109.308033]) },
                                }}
                            >
                                <Popup>
                                    <CardPopUp value={10} />
                                </Popup>
                            </Marker>
                            <Marker
                                position={[-0.041145549983687454, 109.35197836838654]}
                                eventHandlers={{
                                    click: () => { handleMarkerClick([-0.041145549983687454, 109.35197836838654]) },
                                }}
                            // icon={customIcon}
                            >
                                <Popup className='mb-7'>
                                    <CardPopUp value={23} />
                                </Popup>
                            </Marker>
                        </>
                        :
                        ''
                    }
                    {area == true ?
                        <>
                            <Circle
                                center={[-0.013507799364533998, 109.34150794692324]}
                                pathOptions={{
                                    color: 'rgb(255, 187, 0)',
                                    fillColor: 'rgb(255, 187, 0)',
                                    stroke: false,
                                    fillOpacity: 0.6
                                }}
                                radius={1200}
                            />
                            <Circle
                                center={[-0.015396, 109.308033]}
                                pathOptions={{
                                    color: 'rgb(0, 161, 8)',
                                    fillColor: 'rgb(0, 161, 8)',
                                    stroke: false,
                                    fillOpacity: 0.6
                                }}
                                radius={1200}
                            />
                            <Circle
                                center={[-0.041145549983687454, 109.35197836838654]}
                                pathOptions={{
                                    color: 'rgb(240, 13, 13)',
                                    fillColor: 'rgb(240, 13, 13)',
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
            </div>
        </>
    )
}
