import "./Header.scss"
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Home from "../../pages/Home/Home";
import AuthContextProvider from "../../context/AuthContext";
import { useAuth } from "../../hooks/useLogin";

export default function Header() {

    const alocation = useLocation()
    const [location, setLocation] = useState(alocation.pathname.replace('/', ''))
    const { user } = useContext(AuthContextProvider)
    const links = ["HOME", "BIKE", "STATION"]
    user ? links.push("LOGOUT") : links.push("SIGNIN", "SIGNUP");
    const { logout } = useAuth()

    const changeCN = (item) => {
        return alocation.pathname.replace('/', '') === item ? "menu-link is-active" : "menu-link";
    }

    const print = links.map(item => {
        return item !== "LOGOUT" ? <Link to={"/" + item.toLowerCase()} className={changeCN(item)} key={item}>{item}</Link> : <Link to={alocation.pathname} onClick={logout} className={changeCN(item)} key={item}>{item}</Link>
    })

    return (
        <>
            <div className="header">
                <div className="logo"><Link to="Home"><img src="/assets/logos/graygreenwheels.png" alt="greenwheels" width="200vh" /></Link></div>
                <div className="header-menu">
                    {print}
                </div>
                {/* <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div> */}
                <div className="header-profile">
                    {user && (
                        <>
                            <div className="notification campana">
                                <span className="notification-number">3</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                                </svg>
                            </div>
                            {user.img != null ? <img className="profile-img" src={user.img} alt="" /> : <img className="profile-img" src="https://i.postimg.cc/4Nc0VCjD/image.jpg" alt="" />}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}