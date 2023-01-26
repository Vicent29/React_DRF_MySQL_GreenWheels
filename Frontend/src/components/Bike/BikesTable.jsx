import React from 'react'
import { Link } from 'react-router-dom'
import BikesLine from './BikesLine'
import "./Bike.scss"

export default function BikesTable({ bikes, deleteBike/*, changeStatusBike */ }) {

    return (
        <div>
            <Link to="/addbike"><button>New Bike</button></Link>
            <table className='text-white'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID_slot</th>
                        <th>Status</th>
                        <th>PFM</th>
                        <th>Img_bike</th>
                    </tr>
                </thead>
                <tbody>
                    {bikes.map(item => {
                        return <tr key={item.id}><BikesLine bike={item} deleteBike={deleteBike} /></tr>
                    })}
                </tbody>
            </table>
        </div>
        // bikes.map(item => {
        //     return <li key={item.id}>{item.name}</li>
        // })
        // <ul>{savebike}</ul>
        // {JSON.stringify(bikes)}
    )
}