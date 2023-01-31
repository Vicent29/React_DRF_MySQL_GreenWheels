import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import SlotsService from "../services/SlotsService";

export function useSlots() {
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        SlotsService.getSlots()
            .then(({ data }) => {
                setSlots(data)
                setLoading(false)
            })
    }, [])

    const getSlotsnoBike = useCallback(() => {
        SlotsService.getSlotsnoBike()
            .then(({ data }) => {
                if (data) {
                    setSlots(data)
                }
            })
    },[])

    return { loading, slots, getSlotsnoBike/*, getBike, createBike/*, updateBike, changeStatusBike,, deleteBike*/ }
}