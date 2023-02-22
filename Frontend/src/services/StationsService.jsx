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
        return http().post(`/api/astation`, data)
    },
    deleteStation(id, data) {
        return http().delete(`/api/astation/${id}`)
    },
    updateStation(data, slug) {
        return http().put(`/api/aupdate/${slug}`, data)
    },  
}
export default StationsService;