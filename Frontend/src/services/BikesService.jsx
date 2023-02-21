import http from "./http"

const BikesService = {
    getBikes() {
        return http().get("/api/bike")
    },
    getBike(id) {
        return http().get(`/api/bike/${id}`)
    },
    getBikesByStation(id) {
        return http().get(`/api/bikebystation/${id}`)
    },
    createBike(data) {
        return http().post(`/api/abike`, data)
    },
    deleteBike(id, data) {
        return http().delete(`/api/abike/${id}`)
    },
    changeStatusBike(id) {
        return http().put(`/api/abikestatus/${id}`)
    },
    updateBike(data, id) {
        return http().put(`/api/aupdate/${id}`, data)
    },
}
export default BikesService;