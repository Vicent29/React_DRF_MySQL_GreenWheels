import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContextProvider from '../context/AuthContext';
import BikesService from "../services/BikesService";
import { toast } from 'react-toastify';
import { set } from 'react-hook-form';

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
    }, [])

    const getBike = useCallback((id) => {
        BikesService.getBike(id)
            .then(({ data }) => {
                if (data) {
                    setBikes(data)
                }
            })
    }, [])

    const getBikesByStation = useCallback((id) => {
        BikesService.getBikesByStation(id)
            .then(({ data }) => {
                if (data) {
                    setBikes(data)
                }
            })
    }, [])

    const createBike = useCallback((request) => {
        if (request.img_bike == "") {
            request.img_bike = "https://www.emesa-m30.es/wp-content/uploads/2020/08/1-estaciones-bici-mad.jpg"
        }
        BikesService.createBike(request)
            .then(({ data }) => {
                if (data) {
                    toast.success("Bike "+ data.id  +" create success", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate("/bike")
                }
            })
    }, [navigate])

    const deleteBike = ((id) => {
        BikesService.deleteBike(id)
        .then(() => {
            toast.success("Delete bike success", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        setBikes(bikes.filter(bike => bike.id !== id))
    })

    const changeStatusBike = ((id) => {
        BikesService.changeStatusBike(id)
        .then (({data}) => {
            setLoading(true)
            BikesService.getBikes()
            .then(({ data }) => {
                setBikes(data)
                setLoading(false)
            })
            // setBikes(bikes.filter(bike => {return bike.id === data.id  ? bike.status = data.status : bike.status = bike.status}))
        })
    })

    const updateBike = ((request, id) => {
        BikesService.updateBike(request, id)
        .then(({data}) => {
            toast.success("Update bike " +data.id+ " success", {
                position: toast.POSITION.TOP_RIGHT
            });
            BikesService.getBikes()
            .then(({ data }) => {
                setBikes(data)
                setLoading(false)
            })
        })
    })

    return { loading, bikes, setBikes, getBike, createBike, getBikesByStation, changeStatusBike, updateBike, deleteBike }
}
