import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from "react-router-dom"

import AuthContextProvider from "../../context/AuthContext"
import AuthService from '../AuthService';

function AdminGuard() {
    const [loading, setLoading] = useState(false);
    const [print, setPrint] = useState()

    useEffect(() => {
        setLoading(true)
        AuthService.isAdmin()
            .then(() => {
                setLoading(false)
                setPrint(<Outlet />)
            }).catch(() => {
                setPrint(<Navigate to="/" />)
            })
    }, [])

    return (print)
    // return (admin ? <Outlet /> : <Navigate to="/"/>)

}

export default AdminGuard;