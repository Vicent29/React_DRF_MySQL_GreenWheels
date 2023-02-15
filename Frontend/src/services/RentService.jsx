import http from "./http"

const RentService = {
    createRent(data) {
        return http().post("/api/rent", data)
    },
    closeRent(id, data) {
        return http().put("api/rent/" + id, data)
    },
    getRentsByUser() {
        return http().get("api/rent")
    },
}

export default RentService