import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import BikesService from "../services/BikesService";

export function useBikes() {
    const [loading, setLoading] = useState(false);
    const [bikes, setBikes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        BikesService.getBikes()
            .then(({ data }) => {
                setBikes(data)
                setLoading(false)
            })
    }, [])

    const getBike = useCallback((id) => {
        BikesService.getBike(id)
            .then(({ data }) => {
                if (data) {
                    setBikes(data)
                }
            })
    }, [])

    const createBike = useCallback(() => {
        BikesService.createBike()
            .then(({ data }) => {
                if (data) {
                    navigate("/bike")
                }
            })
    }, [navigate])

    const deleteBike = ((id) => {
        BikesService.deleteBike(id)
        setBikes(bikes.filter(bike => bike.id !== id))
    })

    return { loading, bikes, getBike, createBike/*, updateBike, changeStatusBike,*/, deleteBike }
}
