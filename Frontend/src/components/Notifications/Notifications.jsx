import React, { useContext } from 'react'
import AuthContextProvider from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { useNoti } from '../../hooks/useNoti';

export default function Notifications() {
    const { user } = useContext(AuthContextProvider)
    const { notis, getNotiByUser } = useNoti()
    const { resetNotis } = useAuth()

    return (
        <>
            <div className="dropstart">
                <div className="notification campana" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { getNotiByUser(); resetNotis({ notis: 0 }) }}>
                    {user.noti !== 0 && (<span className="notification-number">{user.noti}</span>)}
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                </div>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start bg-dark overflow-auto max-w-[40vw] max-h-[20vh]" aria-labelledby="dropdownMenuButton1">
                    {notis.length !== 0 ?
                        notis.map((noti, id) => {
                            return (<li key={id} className="break-words overflow-hidden text-ellipsis whitespace-normal"><a className="dropdown-item block w-[100%] text-white bg-dark">{noti.desc[0].toUpperCase()}{noti.desc.substr(1, noti.desc.length - 1)}</a><hr className='m-1 sticky left-[2.5%] w-[95%] text-white' /></li>)
                        })
                        :
                        <li><a className="dropdown-item  text-white bg-dark" href="#">No notis yet</a></li>
                    }
                </ul>
            </div>
        </>
    )
}