import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContextProvider from '../context/AuthContext';
import BikesService from "../services/BikesService";

export function useIncident() {
    const [loading, setLoading] = useState(false);
    const [bikes, setBikes] = useState([])
    const { rftoken } = useContext(AuthContextProvider)
    const navigate = useNavigate();

    const createIncidence = useCallback((request) => {
        console.log(request);
        if (request.incident == "bike") {
            
        } else if (request.incident == "slot") {

        } else {

        }
        // BikesService.createBike(request)
        //     .then(({ data }) => {
        //         if (data) {
        //             navigate("/bike")
        //         }
        //     })
    }, [navigate])

    return { createIncidence }
}