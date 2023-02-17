import { useCallback, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import IncidentService from "../services/IncidentService";

export function useIncident() {
    const navigate = useNavigate();
    const [incs, setInc] = useState([])

    const createIncidence = useCallback((request) => {
        if (request.incident == "bike") {
            IncidentService.createIncBike(request)
                .then(({ data }) => {
                    if (data) {
                        navigate("/home")
                    }
                })
        } else if (request.incident == "slot") {
            IncidentService.createIncSlot(request)
                .then(({ data }) => {
                    if (data) {
                        navigate("/home")
                    }
                })
        } else {
            IncidentService.createIncOther(request)
                .then(({ data }) => {
                    if (data) {
                        navigate("/home")
                    }
                })
        }
        toast.success("Incidence created successfully", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }, [navigate])

    const getAllInc = useCallback(() => {
        IncidentService.getAllInc()
            .then(({ data }) => {
                setInc(data)
            })
    }, [])

    const closeInc = useCallback(async (data) => {
        await IncidentService.closeInc(data)
    }, [])

    return { incs, setInc, createIncidence, getAllInc,closeInc }
}