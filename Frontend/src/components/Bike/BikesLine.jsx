import React from 'react'

export default function BikesLine({ bike, deleteBike,/* changeStatusBike */ }) {
    return (
        <>
            <td>{bike.id}</td>
            <td>{bike.slot}</td>
            <td>{bike.status === true ? 'true' : 'false'}</td>
            <td>{bike.pfm}</td>
            <td>{bike.img_bike}</td>
            <td onClick={(e) => deleteBike(bike.id)}><button>delete</button></td>
        </>
    )
}