import React from 'react'
import { useStations } from '../../hooks/useStations'
import StationsTable from "../../components/Stations/StationsTable"


export default function Stations() {
    const { stations, deleteStation, updateStation } = useStations()
    return (
        <>
            <StationsTable stations={stations} deleteStation={deleteStation} updateStation={updateStation} />
        </>
    )
}