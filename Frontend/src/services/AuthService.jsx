import http from "./http"

const AuthService = {
    getUsers() {
        return http().get("/api/auser")
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
    updateUser(data) {
        return http().put(`/api/user/update`, data)
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

    deleteUser(id) {
        return http().delete(`/api/user/${id}`)
    },
    allchatid() {
        return http().get("/api/allchatid")
    },
    checkChatID(data) {
        return http().post('/api/checkid', data)
    },
    changeStatus(id){
        return http().put(`/api/astatus/${id}`)
    }
}
export default AuthService;