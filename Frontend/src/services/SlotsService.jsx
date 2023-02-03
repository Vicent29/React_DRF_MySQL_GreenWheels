import http from "./http"

const SlotsService = {
    getSlots() {
        return http().get("/api/slot")
    },
    getSlot(id) {
        return http().get(`/api/slot/${id}`)
    },
    getSlotsnoBike() {
        return http().get(`/api/slotnobike`)
    },
    createSlot(data) {
        return http().post(`/api/slot`, data)
    },
    deleteSlot(id) {
        return http().delete(`/api/slot/${id}`)
    },
}
export default SlotsService;