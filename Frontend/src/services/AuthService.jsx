import http from "./http"

const AuthService = {
    getUsers() {
        return http().get("/api/user")
    },
    getUser(id) {
        return http().get(`/api/user/${id}`)
    },
    getUserTk() {
        return http().get(`/api/usertk`)
    },
    registerUser(data) {
        return http().post(`/api/register`, data)
    },
    loginUser(data) {
        return http().post(`/api/login`, data)
    },
    logout() {
        return http().post(`/api/logout`)
    },
    isAdmin() {
        return http().get("/api/user/isadmin")
    },
    changePassword(data) {
        return http().put(`/api/change_password/`, data)
    },
    deleteUser(id) {
        return http().delete(`/api/user/${id}`)
    },
    allchatid() {
        return http().get("/api/allchatid")
    },
}
export default AuthService;