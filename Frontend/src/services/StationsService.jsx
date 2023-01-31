import http from "./http"

const StationsService = {
    getStations() {
        return http().get("/api/station")
    },
    getStation(id) {
        return http().get(`/api/station/${id}`)
    },
    getStationsMap() {
        return http().get(`/api/stationmap`)
    },
    createStation(data) {
        return http().post(`/api/station`, data)
    },
    deleteStation(id, data) {
        return http().delete(`/api/station/${id}`)
    },
}
export default StationsService;