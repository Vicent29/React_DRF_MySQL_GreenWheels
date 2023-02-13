import http from "./http"

const RentService = {
    createRent(data) {
        return http().post("/api/rent", data)
    },
    closeRent(id) {
        return http().put("api/rent/" + id)
    }
}

export default RentService