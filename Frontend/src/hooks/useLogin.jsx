import { /*useEffect,*/ useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"

// import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import JWTService from '../services/JWTService';

import { toast } from 'react-toastify';


export function useAuth () {
    const navigate = useNavigate();
    // const { user, setUser, isAdmin, setIsAdmin, checkAdmin, jwt, setJWT } = useContext(AuthContext)

    const [ status, setStatus ] = useState({loading: false, error: false})

    const signup = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.registerUser(data) 
        .then((res) => {
            console.log(res);
            setStatus({ loading: false, error: false });
            JWTService.saveToken(res.data.access)
            // setJWT(res.data.access)
            toast.success("User "+res.data.user.first_name + " login successfully", {
                position: toast.POSITION.TOP_CENTER
              });
            navigate('/');            
        }).catch((error) => {
            if (error.response.data == "Email exist.") {
                toast.error("The email already belongs to an account", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setStatus({ loading: false, error: true });
            }
        });
    },[setStatus, navigate]);

    const signin = useCallback((data) => {
        setStatus({ loading: true});
        AuthService.loginUser(data) 
        .then((res) => {
            setStatus({ loading: false, error: false });
            JWTService.saveToken(res.data.access)
            // setJWT(res.data.access)
            toast.success("User " + res.data.user.first_name + " login successfully", {
                position: toast.POSITION.TOP_CENTER
              });
            navigate('/');            
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.data == 'email or password not correct') {
                toast.error("Email or password is not correct", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setStatus({ loading: false});
            }
        });
    },[setStatus, navigate]);

    

    return {status,signup,signin, /*user, setUser, isAdmin, setIsAdmin, checkAdmin, jwt, setJWT*/}
}


