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
        return http().post(`/api/aslot`, data)
    },
    deleteSlot(id) {
        return http().delete(`/api/aslot/${id}`)
    },
    updateSlot(data, id) {
        return http().put(`/api/aslot/${id}`, data)
    },
}
export default SlotsService;