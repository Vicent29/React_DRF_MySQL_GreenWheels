import React, { useState } from 'react'
export default function Notifications() {
    return (
        <>
            <div className="dropstart">
                <div className="notification campana" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="notification-number">3</span>
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                </div>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start bg-dark" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item  text-white bg-dark" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </>
    )
}