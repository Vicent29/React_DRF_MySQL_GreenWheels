import { /*useEffect,*/useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import AuthContextProvider from '../context/AuthContext';
import AuthService from '../services/AuthService';
import JWTService from '../services/JWTService';

import { toast } from 'react-toastify';


export function useAuth() {
    const navigate = useNavigate();
    const { user, loadUser, checkAdmin, setJWT, setUser, setIsAdmin } = useContext(AuthContextProvider)


    const [status, setStatus] = useState({ loading: false, error: false })

    const signup = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.registerUser(data)
            .then((res) => {
                setUserLoged(res);
            }).catch((error) => {
                if (error.response.data == "Email exist.") {
                    toast.error("The email already belongs to an account", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setStatus({ loading: false, error: true });
                }
            });
    }, [setStatus]);

    const signin = useCallback((data) => {
        setStatus({ loading: true });
        AuthService.loginUser(data)
            .then((res) => {
                setUserLoged(res);
            }).catch((error) => {
                console.log(error.response.data);
                if (error.response.data == 'email or password not correct') {
                    toast.error("Email or password is not correct", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setStatus({ loading: false });
                }
            });
    }, [setStatus]);

    const setUserLoged = useCallback((res) => {
        setStatus({ loading: false, error: false });
        JWTService.saveToken(res.data.token, res.data.rftoken);
        toast.success("User " + res.data.user.first_name + " login successfully", {
            position: toast.POSITION.TOP_RIGHT
        });
        async function loadData() {
            await loadUser()
            await checkAdmin()
        }
        loadData()
        navigate('/home');
    }, [setStatus, navigate])


    const logout = useCallback( async() => {
       await AuthService.logout()
            .then((res) => {
                navigate('/home');
                if (res.data == "Logout Backend user success") {
                    toast.info("LogOut backend succes", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }).catch((error) => {
                navigate('/home');
                console.log(error.response);
            });
        if (user) {
            setUser(null)
            setJWT(null)
        }
        setIsAdmin(false)
        JWTService.destroyAllTokens();
        toast.success("LogOut successfully ", {
            position: toast.POSITION.TOP_RIGHT
        });
    }, [navigate, user])


    const updateUser = useCallback((data) => {
        console.log("Dentro del Update user");
        // setStatus({ loading: true, error: false });
        // AuthService.updateUser(data) 
        // .then((response) => {
        //     setStatus({ loading: false, error: false });
        //     navigate('/');
        // }).catch((error) => {
        //     setStatus({ loading: false, error: true });
        // });
    }, [navigate]);



    return { status, signup, signin, setUserLoged, logout, updateUser, loadUser, checkAdmin, setJWT, setUser }
}


