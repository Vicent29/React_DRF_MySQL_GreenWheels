import React from 'react'

export default function BikesTable({ bike, deleteBike,/* changeStatusBike */ }) {
    return (
        <>
            <td>{bike.id}</td>
            <td>{bike.name}</td>
            <td>{bike.location}</td>
            <td onClick={(e) => deleteBike(bike.id)}><button>delete</button></td>
        </>
    )
}