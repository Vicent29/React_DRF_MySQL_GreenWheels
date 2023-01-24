import http from "./http"

const BikesService = {
    getBikes() {
        return http().get("/api/bike")
    },
    getBike(id) {
        return http().get(`/api/bike/${id}`)
    },
    createBike(data) {
        return http().post(`/api/bike`, data)
    },
    deleteBike(id, data) {
        return http().delete(`/api/bike/${id}`)
    },
}
export default BikesService;