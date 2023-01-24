import axios from "axios"

// import JwtService from "./JWTService"

export default function http() {
    return axios.create({
        baseURL: "http://localhost:3000/"
    })
    // if (JwtService.getToken()) {
    //     return axios.create({
    //         baseURL: "http://127.0.0.1:3000/",
    //         headers: {
    //             "Content-type": "application/json",
    //             "Authorization": `Bearer ${JwtService.getToken()}`
    //         }
    //     });
    // } else {
    //     return axios.create({
    //         baseURL: "http://127.0.0.1:3000/",
    //         headers: {
    //             "Content-type": "application/json",
    //         }
    //     });
    // }
}