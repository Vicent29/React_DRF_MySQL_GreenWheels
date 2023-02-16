import http from "./http"

const NotificationsService = {
    getNotiByUser() {
        return http().get("/api/noti")
    },
}
export default NotificationsService