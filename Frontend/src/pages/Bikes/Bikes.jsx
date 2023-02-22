import React, { useEffect} from "react";
import { useBikes } from '../../hooks/useBikes'
import { useSlots } from "../../hooks/useSlots";
import BikesTable from "../../components/Bike/BikesTable"


export default function Bikes() {
    const { bikes, deleteBike, changeStatusBike, updateBike } = useBikes()
    const { slots, getSlotsnoBike} = useSlots();
   
    useEffect(() => {
        getSlotsnoBike()
    }, [])

    return (
        <BikesTable bikes={bikes} slots={slots} deleteBike={deleteBike} changeStatusBike={changeStatusBike} updateBike={updateBike} />
    )
}