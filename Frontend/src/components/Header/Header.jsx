import "./Header.scss"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function Bikes() {

    const alocation = useLocation()
    const [location, setLocation] = useState(alocation.pathname.replace('/', ''))
    const links = ["home", "bike"]

    const changeCN = (item) => {
        return alocation.pathname.replace('/', '') === item ? "menu-link is-active" : "menu-link";
    }

    const print = links.map(item => {
        return <Link to={"/" + item} className={changeCN(item)} key={item}>{item}</Link>
    })

    return (
        <>
            <div className="header">
                <div className="logo"><img src="/graygreenwheels.png" alt="greenwheels" width="200vh"/></div>
                <div className="header-menu">
                    {print}
                </div>
                {/* <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div> */}
                <div className="header-profile">
                    <div className="notification campana">
                        <span className="notification-number">3</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                    </div>
                    <img className="profile-img" src="https://i.postimg.cc/4Nc0VCjD/image.jpg" alt="" />
                </div>
            </div>
        </>
    )
}