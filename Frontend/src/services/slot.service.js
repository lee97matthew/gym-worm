import axios from "axios";
import AuthService from "./auth.service";


const API_URL = "http://localhost:5000/api/slot/";

class SlotService {
    async createSlot(date, startTime, capacity) {
        return await axios
            .post(API_URL + "createSlot", {
                date,
                startTime,
                capacity
            })
            .then(response => {
                return response.data;
            });
    }

    async updateSlot(slotID, date, startTime, capacity, fullCapacity) {
        return await axios
            .put(API_URL + "updateSlot", {
                slotID,
                date,
                startTime,
                capacity,
                fullCapacity,
            })
            .then(response => {
                return response.data;
            });
    }

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
        await axios.post(API_URL + "bookSlot", {
            slotID,
            userID,
            userEmail
        })
            .then(updatedSlot => {
                return updatedSlot.data;
            })
    }

    async recordBooking(slotID, userID) {
        return await axios.post(API_URL + "recordBooking", {
            slotID,
            userID
        })
            .then(booking => {
                return booking.data;
            })
    }

    async cancelledBooking(slotID, userID) {
        return await axios.put(API_URL + "cancelledBooking", {
            slotID,
            userID
        })
            .then(booking => {
                return booking.data;
            })
    }

    
    async retrieveSlot(bookingID) {
        return await axios
            .get(API_URL + "retrieveSlot", {
                bookingID
            })
            .then(response => {
                return response.data;
            });
    }
    
}

export default new SlotService();