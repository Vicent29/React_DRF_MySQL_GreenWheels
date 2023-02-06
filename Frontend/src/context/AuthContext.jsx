import React, { useEffect, useState } from "react"
import AuthService from "../services/AuthService"
import JWTService from "../services/JWTService";
const Context = React.createContext({});

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [jwt, setJWT] = useState(localStorage.getItem('token'));
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            await loadUser()
            await checkAdmin()
            setLoading(false)
        }
        loadData();
    }, [])

    const loadUser = async () => {
        console.log("Soy el LOADUSER");
        await AuthService.getUserTk()
            .then(({ data }) => {
                setUser(data.user)
                setJWT(data.token)
                JWTService.saveToken(data.token, data.rftoken)
            })
            .catch(({ error }) => {
                if (localStorage.getItem('rftoken')) {
                    rftoken();
                } else {
                    localStorage.removeItem('token')
                    setUser(null)
                }
            });
    }

    const rftoken = async () => {
        await JWTService.destroyToken();
        await AuthService.getUserTk()
            .then(({ data }) => {
                console.log(data);
                setUser(data.user)
                setJWT(data.token)
                localStorage.setItem('token', data.token)
            })
            .catch(({ response }) => {
                localStorage.removeItem('token');
                localStorage.removeItem('rftoken');
                setUser(null);
                setJWT(null);
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
        <Context.Provider value={{ loadUser, user, setUser, rftoken, isLoading, isAdmin, setIsAdmin, jwt, setJWT }}>{children}</Context.Provider>
    );
}

export default Context;