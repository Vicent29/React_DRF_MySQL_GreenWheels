import axios from "axios"
import JwtService from "./JWTService"

export default function http() {
    if (JwtService.getToken()) {
        return axios.create({
            baseURL: "http://localhost:3001/",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });
    } else {
        return axios.create({
            baseURL: "http://localhost:3001/",
            headers: {
                "Content-type": "application/json",
            }
        });
    }
}