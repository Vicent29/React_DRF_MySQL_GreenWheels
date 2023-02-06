import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContextProvider from '../context/AuthContext';
import BikesService from "../services/BikesService";

export function useBikes() {
    const [loading, setLoading] = useState(false);
    const [bikes, setBikes] = useState([])
    const { rftoken } = useContext(AuthContextProvider)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        BikesService.getBikes()
            .then(({ data }) => {
                setBikes(data)
                setLoading(false)
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const getBike = useCallback((id) => {
        BikesService.getBike(id)
            .then(({ data }) => {
                if (data) {
                    setBikes(data)
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const getBikesByStation = useCallback((id) => {
        BikesService.getBikesByStation(id)
            .then(({ data }) => {
                if (data) {
                    setBikes(data)
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const createBike = useCallback((request) => {
        BikesService.createBike(request)
            .then(({ data }) => {
                if (data) {
                    navigate("/bike")
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [navigate])

    const deleteBike = ((id) => {
        BikesService.deleteBike(id)
        setBikes(bikes.filter(bike => bike.id !== id))
    })

    return { loading, bikes, getBike, createBike, getBikesByStation/*, updateBike, changeStatusBike,*/, deleteBike }
}
