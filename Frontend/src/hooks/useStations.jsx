import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import StationsContext from '../context/StationsContext';
import StationsService from "../services/StationsService";
import AuthContextProvider from '../context/AuthContext';

export function useStations() {
    const [loading, setLoading] = useState(false);
    const { stations, setStations } = useContext(StationsContext)
    const { rftoken } = useContext(AuthContextProvider)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        StationsService.getStationsMap()
            .then(({ data }) => {
                setStations(data)
                setLoading(false)
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const getStationsMap = useCallback(() => {
        StationsService.getStationsMap()
            .then(({ data }) => {
                if (data) {
                    setStations(data)
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const getStation = useCallback((id) => {
        StationsService.getStation(id)
            .then(({ data }) => {
                if (data) {
                    setStations(data)
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [])

    const createStation = useCallback((request) => {
        StationsService.createStation(request)
            .then(({ data }) => {
                if (data) {
                    navigate("/station")
                }
            })
            .catch(e => {
                if (e.response.status === 403)
                    rftoken();
            })
    }, [navigate])

    const deleteStation = ((id) => {
        StationsService.deleteStation(id)
        setStations(stations.filter(station => station.id !== id))
    })

    return { loading, stations, getStation, createStation, getStationsMap,/*, updateBike, changeStatusBike,*/ deleteStation }
}