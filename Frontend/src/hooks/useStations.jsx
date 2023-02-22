import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import StationsContext from '../context/StationsContext';
import StationsService from "../services/StationsService";
import AuthContextProvider from '../context/AuthContext';
import { toast } from 'react-toastify';

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

    }, [])

    const getStationsMap = useCallback(() => {
        StationsService.getStationsMap()
            .then(({ data }) => {
                if (data) {
                    setStations(data)
                }
            })
            .catch(e => {
                if (e.response.status === 403 && localStorage.getItem('rftoken'))
                    rftoken()
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
        StationsService.createStation(request)
            .then(({ data }) => {
                if (data) {
                    toast.success("Created station " +data.slug+ " success", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate("/station")
                }
            })
    }, [navigate])

    const updateStation = ((request, slug) => {
        console.log(request);
        StationsService.updateStation(request, slug)
        .then(({data}) => {
            toast.success("Update station " +data.slug+ " success", {
                position: toast.POSITION.TOP_RIGHT
            });
            StationsService.getStationsMap()
            .then(({ data }) => {
                setStations(data)
                setLoading(false)
            })
        })
    })

    const deleteStation = ((id) => {
        StationsService.deleteStation(id)
        .then(({data}) => {
            toast.success("Deleted station success", {
                position: toast.POSITION.TOP_RIGHT
            });

            setStations(stations.filter(station => station.id !== id))
        })
        
    })

    return { loading, stations, getStation, createStation, getStationsMap,updateStation, deleteStation }
}