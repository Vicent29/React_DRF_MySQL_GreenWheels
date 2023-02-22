import React, {useEffect} from 'react'
import { useSlots } from '../../hooks/useSlots'
import SlotsTable from "../../components/Slots/SlotsTable"


export default function Stations() {
    const { slots,getSlots, deleteSlot, updateSlot } = useSlots()
    
    useEffect( ()=> {
         getSlots()
    },[])

    return (
        <>
            <div className='lg:w-[80%] lg:ml-[10%]'>
                <SlotsTable slots={slots} deleteSlot={deleteSlot} updateSlot={updateSlot} />
            </div>
        </>
    )
}