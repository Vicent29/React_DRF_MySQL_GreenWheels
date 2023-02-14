import React, { useContext, useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"

import AuthContext from '../../context/AuthContext'
import AuthService from '../AuthService';

export function NoAuthGuard() {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/home" /> : <Outlet />
}

export function AuthGuard() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [print, setPrint] = useState()

    useEffect(() => {
        setLoading(true)
        AuthService.getUserTk()
            .then(() => {
                setLoading(false)
                setPrint(<Outlet />)
            }).catch(() => {
                setPrint(<Navigate to="/signin" />)
            })
    }, [])

    return print
}