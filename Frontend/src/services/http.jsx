import axios from "axios"
import JWTService from "./JWTService";
import secret from "./secret";

export default function http() {
    let api
    if (JWTService.getToken()) {
        api = axios.create({
            baseURL: secret.DJANGO_APP_URL,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${JWTService.getToken()}`
            }
        });
    } else if (localStorage.getItem('rftoken')) {
        api = axios.create({
            baseURL: secret.DJANGO_APP_URL,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('rftoken')}`
            }
        });
    }
    else {
        api = axios.create({
            baseURL: secret.DJANGO_APP_URL,
            headers: {
                "Content-type": "application/json",
            }
        });
    }

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 403 && error.response.data.detail != 'Authentication credentials were not provided.' && error.response.data.detail != 'You are not staff') {
                if (!localStorage.getItem('token')) {
                    JWTService.destroyAllTokens();
                }
                JWTService.destroyToken();
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    return api

}