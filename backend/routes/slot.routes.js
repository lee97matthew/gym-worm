const controller = require("../controllers/slot.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/slot/createSlot", controller.createSlot);

    app.put("/api/slot/updateSlot", controller.updateSlot);

    app.post("/api/slot/fetchSlots", controller.fetchSlots);

    app.post("/api/slot/bookSlot", controller.bookSlot);

    app.post("/api/slot/recordBooking", controller.recordBooking); 

    app.put("/api/slot/cancelledBooking", controller.cancelledBooking); 
};