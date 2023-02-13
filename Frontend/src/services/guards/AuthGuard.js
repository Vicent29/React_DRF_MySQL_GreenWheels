import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"

import AuthContext from '../../context/AuthContext'

export function NoAuthGuard() {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/home" /> : <Outlet />  
}

export function AuthGuard() {
    const { user } = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/login" />
}