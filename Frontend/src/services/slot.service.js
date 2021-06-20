import axios from "axios";

const API_URL = "http://localhost:5000/api/slot/";

class SlotService {
    async fetchSlots(currentDate) {
        return await axios
            .post(API_URL + "fetchSlots", {
                currentDate
            })
            .then(response => {
                if (response.data.getSlots) {
                    localStorage.setItem(JSON.stringify(currentDate), JSON.stringify(response.data.getSlots));
                }
                return response.data;
            });
    }

    getCurrentSlots(currentDate) {
        return JSON.parse(localStorage.getItem(JSON.stringify(currentDate)));
    }

    clearCurrentSlots(currentDate) {
        localStorage.removeItem(JSON.stringify(currentDate));
    }

    async bookSlot(slotID, userID, userEmail) { // use this command -> SlotService.bookSlot(currentSlot.id, currentUser.id, currentUser.email)
        return await axios.post(API_URL + "bookSlot", {
                slotID,
                userID,
                userEmail
            })
            .then(response => {
                return response.data;
            })
        // need to create booking record
    }
}

export default new SlotService();