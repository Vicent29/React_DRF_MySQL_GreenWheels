import React from 'react'
import { useSlots } from '../../hooks/useSlots'
import SlotsTable from "../../components/Slots/SlotsTable"


export default function Stations() {
    const { slots, deleteSlot, updateSlot } = useSlots()
    return (
        <>
            <SlotsTable slots={slots} deleteSlot={deleteSlot} updateSlot={updateSlot} />
        </>
    )
}