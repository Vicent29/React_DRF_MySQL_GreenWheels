import React from 'react'
// import { Link } from 'react-router-dom'
import BikesLine from './BikesLine'
import "./Bike.scss"

export default function BikesTable({ bikes, deleteBike/*, changeStatusBike */ }) {

    return (
        <table className='text-white'>
            <thead>
                <tr>
                    <th>Slug</th>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {bikes.map(item => {
                    return <tr key={item.id}><BikesLine bike={item} deleteBike={deleteBike} /></tr>
                })}
            </tbody>
        </table>
        // bikes.map(item => {
        //     return <li key={item.id}>{item.name}</li>
        // })
        // <ul>{savebike}</ul>
        // {JSON.stringify(bikes)}
    )
}