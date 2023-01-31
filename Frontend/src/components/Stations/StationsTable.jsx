import React from 'react'
import { Link } from 'react-router-dom'
import StationLine from './StationsLine'
// import "./Bike.scss"

export default function StationsTable({ stations, deleteStation/*, changeStatusBike */ }) {

    return (
        <div>
            <Link to="/addstation"><button>New Station</button></Link>
            <table className='text-white'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Slug</th>
                        <th>Name</th>
                        <th>Long</th>
                        <th>Lat</th>
                        <th>img</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map(item => {
                        return <tr key={item.id}><StationLine station={item} deleteStation={deleteStation} /></tr>
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