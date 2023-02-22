import { useEffect, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContextProvider from '../context/AuthContext';
import SlotsService from "../services/SlotsService";
import { toast } from 'react-toastify';

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
    }, [])

    const getSlots= useCallback(async()=> {
        await SlotsService.getSlots()
            .then(({ data }) => {
                setSlots(data)
            })
    },[slots])

    const getSlotsnoBike = useCallback(async () => {
        await SlotsService.getSlotsnoBike()
            .then(({ data }) => {
                if (data) {
                    setSlots(data)
                }
            })
    }, [])

    const createSlot = useCallback( (request) => {
        let test = []
        console.log(request);
          SlotsService.createSlot(request)
            .then(({ data }) => {
                if (data) {
                    console.log(data);
                    toast.success("Slot "+ data.id  +" create success", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    
                    console.log([...slots, data]);
                    test =[...slots, data]
                }
            })
        setSlots(test)
    }, [slots])

    const deleteSlot = useCallback(async (id) => {
        await SlotsService.deleteSlot(id)
            .then(() => {
                toast.success("Delete slot success", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        setSlots(slots.filter(slot => slot.id !== id))
    })

    const updateSlot = useCallback(async (request, id) => {
        await SlotsService.updateSlot(request, id)
            .then(({ data }) => {
                toast.success("Update slot " + data.id + " success", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    })

    return { loading, slots, setSlots, getSlotsnoBike, deleteSlot, updateSlot, createSlot, getSlots }
}