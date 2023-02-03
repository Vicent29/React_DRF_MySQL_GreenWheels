import http from "./http"

const AuthService = {
    getUsers() {
        return http().get("/api/user")
    },
    getUser(id) {
        return http().get(`/api/user/${id}`)
    },
    registerUser(data) {
        return http().post(`/api/register`, data)
    },
    loginUser(data) {
        return http().get(`/api/login`, data)
    },
    isAdmin(data) {
        return http().get("/api/userIsAdmin/", data)
    },
    changePassword(data){
        return http().put(`/api/change_password/`, data)
    },
    deleteUser(id) {
        return http().delete(`/api/user/${id}`)
    },
}
export default AuthService;