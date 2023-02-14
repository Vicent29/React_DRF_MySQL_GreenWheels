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
}

export default IncidentService