import React from 'react'

export default function StationLine({ station, deleteStation }) {
    return (
        <>
            <td>{station.id}</td>
            <td>{station.slug}</td>
            <td>{station.name}</td>
            <td>{station.long}</td>
            <td>{station.lat}</td>
            <td>{station.img}</td>
            <td onClick={(e) => deleteStation(station.id)}><button>delete</button></td>
        </>
    )
}