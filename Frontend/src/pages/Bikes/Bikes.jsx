// import React from 'react'
import { useBikes } from '../../hooks/useBikes'
import BikesTable from "../../components/Bike/BikesTable"


export default function Bikes() {
    const { bikes, deleteBike } = useBikes()
    // console.log(bikes);
    // console.log(test);
    return (
        // <h1>{JSON.stringify(bikes)}</h1>
        // <option value="">{bikes[0].name}</option>
        <BikesTable bikes={bikes} deleteBike={deleteBike} />
    )
}