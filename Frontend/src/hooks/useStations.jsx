import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import StationsContext from '../context/StationsContext'
import StationsService from "../services/StationsService";

export function useStations() {
    const [loading, setLoading] = useState(false);
    const { stations, setStations } = useContext(StationsContext)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        StationsService.getStationsMap()
            .then(({ data }) => {
                setStations(data)
                console.log(data);
                setLoading(false)
            })
    }, [])

    const getStationsMap = useCallback(() => {
        StationsService.getStationsMap()
            .then(({ data }) => {
                if (data) {
                    setStations(data)
                }
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

    const deleteStation = ((id) => {
        StationsService.deleteStation(id)
        setStations(stations.filter(station => station.id !== id))
    })

    return { loading, stations, getStation, createStation, getStationsMap,/*, updateBike, changeStatusBike,*/ deleteStation }
}