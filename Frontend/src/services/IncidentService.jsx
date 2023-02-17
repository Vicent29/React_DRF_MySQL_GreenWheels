import http from "./http"

const IncidentService = {
    createIncBike(data) {
        return http().post("/api/IncBikes", data)
    },
    createIncSlot(data) {
        return http().post("/api/IncSlots", data)
    },
    createIncOther(data) {
        return http().post("/api/IncOthers", data)
    },
    getAllInc() {
        return http().get("/api/allInc")
    },
    closeInc(data) {
        return http().post("/api/closeInc", data)
    }
}

export default IncidentService