import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"

import AuthContextProvider from "../../context/AuthContext"

function AdminGuard() {
    const { isAdmin } = useContext(AuthContextProvider);
    return (isAdmin ? <Outlet /> : <Navigate to="/"/>)
}

export default AdminGuard;