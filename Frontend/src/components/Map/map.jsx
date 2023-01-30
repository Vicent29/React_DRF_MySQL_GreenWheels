import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css"

export default function MyMap({ markers = [] }) {
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
                {/* <Marker></Marker> */}
            </Map>
        </div>
    );
}