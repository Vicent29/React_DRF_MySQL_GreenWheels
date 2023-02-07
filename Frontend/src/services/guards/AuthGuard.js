import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"

import AuthContext from '../../context/AuthContext'

export function NoAuthGuard() {
    const { isAuth } = useContext(AuthContext);
    console.log(isAuth);
    return isAuth ? <Navigate to="/home" /> : <Outlet />  
}

export function AuthGuard() {
    const { isAuth } = useContext(AuthContext);
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}