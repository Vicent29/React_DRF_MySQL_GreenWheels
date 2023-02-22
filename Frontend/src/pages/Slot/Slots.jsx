import React from 'react'
import { useSlots } from '../../hooks/useSlots'
import SlotsTable from "../../components/Slots/SlotsTable"


export default function Stations() {
    const { slots/*, deleteStation, updateStation*/ } = useSlots()
    return (
        <>
            <SlotsTable slots={slots} /*deleteStation={deleteStation} updateStation={updateStation} */ />
        </>
    )
}