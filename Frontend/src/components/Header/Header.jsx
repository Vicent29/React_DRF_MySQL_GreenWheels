import "./Header.scss"
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import AuthContextProvider from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import Notifications from "../Notifications/Notifications";
import Announce from "../Notifications/Announce";

export default function Header() {

    const alocation = useLocation()
    const [location, setLocation] = useState(alocation.pathname.replace('/', ''))
    const { user, isAdmin } = useContext(AuthContextProvider)
    const links = ["HOME"]
    user ? isAdmin ? links.push("BIKE", "STATION", "LOGOUT") : links.push("INCIDENT", "LOGOUT") : links.push("SIGNIN", "SIGNUP");
    const { logout } = useAuth()

    const changeCN = (item) => {
        return alocation.pathname.replace('/', '') === item.toLowerCase() ? "menu-link is-active" : "menu-link";
    }

    const print = links.map(item => {
        return item !== "LOGOUT" ? <Link to={"/" + item.toLowerCase()} className={changeCN(item)} key={item}>{item}</Link> : <Link to={alocation.pathname} onClick={logout} className={changeCN(item)} key={item}>{item}</Link>
    })

    return (
        <>
            <div className="header" id="header">
                <div className="logo"><Link to="Home"><img src="/assets/logos/graygreenwheels.png" alt="greenwheels" width="200vh" /></Link></div>
                <div className="header-profile">
                    {user && (
                        <>
                            <Notifications />
                            <Link to="profile"><img className="profile-img" src={user.avatar ? user.avatar : 'https://i.postimg.cc/T3g6d9nk/image.png'} alt="Avatar user" /></Link>
                        </>
                    )}
                </div>
                <div className="header-menu">
                    {isAdmin && (
                        <Announce />
                    )}
                    {print}
                </div>
            </div>
        </>
    )
}