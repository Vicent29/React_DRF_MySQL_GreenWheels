import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss"
import { useState, Link } from "react";

export default function MyMap({ markers = [],clickonMap }) {
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

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
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />
                {markers.map((item, id) => {
                    return <Marker key={id} latitude={item.lat} longitude={item.long} />
                })}

                {markers.map((marker, index) => (
                    <Marker key={marker.id} latitude={marker.lat} longitude={marker.long}>
                        <button onClick={() => {setSelectedMarkerIndex(index); clickonMap(markers[index].id)}}>
                            <div style={{ backgroundColor: 'transparent', width: 25, height: 50, borderRadius: '50%' }} />
                        </button>
                    </Marker>
                ))}
                {selectedMarkerIndex !== null && (
                    <Popup
                        latitude={markers[selectedMarkerIndex].lat}
                        longitude={markers[selectedMarkerIndex].long}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setSelectedMarkerIndex(null)}
                        anchor="top"
                    >
                        <div className="text-black">
                            <b>{markers[selectedMarkerIndex].bikes}</b>  bikes available
                            <br />
                            <img src={markers[selectedMarkerIndex].img} alt="img" />
                            <br />
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}