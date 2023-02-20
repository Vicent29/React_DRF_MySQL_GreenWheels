import React, { useCallback, useEffect, useState } from "react"
import AuthService from "../services/AuthService"
import JWTService from "../services/JWTService";
import { useAuth } from "../hooks/useAuth";

const Context = React.createContext({});

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [jwt, setJWT] = useState(localStorage.getItem('token'));
    const [isLoading, setLoading] = useState(true);
    const { logout } = useAuth()

    useEffect(() => {
        async function loadData() {
            await loadUser()
            await checkAdmin()
            setLoading(false)
        }
        loadData();
    }, [])

    const loadUser = async () => {
        await AuthService.getUserTk()
            .then(({ data }) => {
                setUser(data.user)
                setJWT(data.token)
                JWTService.saveToken(data.token, data.rftoken)
            })
            .catch(({ error }) => {
                if (localStorage.getItem('rftoken')) {
                    rftoken();
                }
            });
    }

    const rftoken = async () => {
        JWTService.destroyToken();
        await AuthService.getUserTk()
            .then(({ data }) => {
                console.log(data);
                setUser(data.user)
                setJWT(data.token)
                localStorage.setItem('token', data.token)
                window.location.reload(false)
            })
            .catch(({ response }) => {
                logout()
            });
    }

    const checkAdmin = async () => {
        await AuthService.isAdmin()
            .then((response) => {
                setIsAdmin(true);
            }).catch((error) => {
                setIsAdmin(false);
            })
        }

    return (
        <Context.Provider value={{ user, setUser, rftoken, isLoading, isAdmin, checkAdmin, setIsAdmin, jwt, setJWT, loadUser }}>{children}</Context.Provider>
    );
}

export default Context;