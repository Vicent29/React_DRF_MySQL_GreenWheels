import { useCallback, useState } from "react"
import NotificationsService from "../services/NotificationsService"

export function useNoti() {
    const [notis, setNotis] = useState([])

    const getNotiByUser = useCallback(async () => {
        await NotificationsService.getNotiByUser()
            .then(({ data }) => {
                setNotis(data)
            })
    }, [])

    return { notis, setNotis, getNotiByUser }
}