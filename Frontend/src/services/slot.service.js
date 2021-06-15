import axios from "axios";

const API_URL = "http://localhost:5000/api/slot/";

class SlotService {
    async fetchSlots(date) {
        return await axios
            .post(API_URL + "fetchSlots",{
                date
            })
            .then(response => {
                return response.data;
            });

        /*const response = await axios
            .post(API_URL + "fetchSlots", {
                date
            });
        return response.data;*/
    }
}

export default new SlotService();