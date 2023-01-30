import React, { useState } from 'react';
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css"
import { useStations } from '../../hooks/useStations'
import { useEffect } from 'react';

export default function MyMap({ onclickmap }) {
    const { stations } = useStations()
    const [stationss, setStations] = useState([])

    useEffect(() => {
        setStations(stations)
    }, [stations])

    const handleClick = e => {
        onclickmap(e.lngLat)
        let newstation = [...stationss]
        if (newstation[newstation.length - 1].latest) {
            newstation[newstation.length - 1] = { latest: true, lat: e.lngLat.lat, long: e.lngLat.lng }
        } else {
            newstation.push({ latest: true, lat: e.lngLat.lat, long: e.lngLat.lng });
        }
        setStations(newstation)
        // setStations((stations.push({ lat: e.lngLat.lat, lng: e.lngLat.long })))
        // {...stationss, }
    }

    return (
        <div className="map300x300">
            <Map
                mapboxAccessToken="pk.eyJ1Ijoic2FudGlpbWFydGluZXoiLCJhIjoiY2t6eWZlYzk2MGIyOTJ2cDdxc2dmcDkxaSJ9.IhYesNObwvyMWu_nQQQoiw"
                initialViewState={{
                    longitude: -0.603869,
                    latitude: 38.823049,
                    zoom: 13,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={handleClick}
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
                {stationss.map((item, id) => {
                    return <Marker key={id} latitude={item.lat} longitude={item.long} />
                })}

            </Map>
        </div>
    );
}