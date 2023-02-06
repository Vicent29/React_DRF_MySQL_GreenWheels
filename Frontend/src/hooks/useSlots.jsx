import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContextProvider from '../context/AuthContext';
import SlotsService from "../services/SlotsService";

export function useSlots() {
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState([])
    const { rftoken } = useContext(AuthContextProvider)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        SlotsService.getSlots()
            .then(({ data }) => {
                setSlots(data)
                setLoading(false)
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const getSlotsnoBike = useCallback(() => {
        SlotsService.getSlotsnoBike()
            .then(({ data }) => {
                if (data) {
                    setSlots(data)
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    return { loading, slots, getSlotsnoBike/*, getBike, createBike/*, updateBike, changeStatusBike,, deleteBike*/ }
}