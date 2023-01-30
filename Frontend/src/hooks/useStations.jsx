import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import StationsService from "../services/StationsService";

export function useStations() {
    const [loading, setLoading] = useState(false);
    const [stations, setStations] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        StationsService.getStations()
            .then(({ data }) => {
                setStations(data)
                setLoading(false)
            })
    }, [])

    const getStation = useCallback((id) => {
        StationsService.getStation(id)
            .then(({ data }) => {
                if (data) {
                    setStations(data)
                }
            })
    }, [])

    const createStation = useCallback((request) => {
        console.log(request);
        StationsService.createStation(request)
            .then(({ data }) => {
                if (data) {
                    navigate("/station")
                }
            })
    }, [navigate])

    return { loading, stations, getStation, createStation/*, updateBike, changeStatusBike,, deleteBike*/ }
}