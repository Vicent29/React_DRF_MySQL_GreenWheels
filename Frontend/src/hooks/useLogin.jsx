import { /*useEffect,*/ useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"

// import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import JWTService from '../services/JWTService';

export function useAuth () {
    const navigate = useNavigate();
    // const { user, setUser, isAdmin, setIsAdmin, checkAdmin, jwt, setJWT } = useContext(AuthContext)

    const [ status, setStatus ] = useState({loading: false, error: false})

    const signup = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.registerUser(data) 
        .then((res) => {
            setStatus({ loading: false, error: false });
            JWTService.saveToken(res.data.access)
            // setJWT(res.data.access)
            navigate('/');
            window.location.reload(false);
            
        }).catch((error) => {
            console.log(error);
            // setStatus({ loading: false, error: true });
        });
    },[setStatus, navigate]);

    

    return {status,signup, /*user, setUser, isAdmin, setIsAdmin, checkAdmin, jwt, setJWT*/}
}


