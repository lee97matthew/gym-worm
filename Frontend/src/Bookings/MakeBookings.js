import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Button, Space, Row, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './Bookings.css'
import SlotService from "../services/slot.service";
import moment from 'moment';

function Bookings() {
    const dateFormat = "YYYY-MM-DD";
    const date = useRef(moment().format(dateFormat));
    const today = moment();
    const [slots, setSlots] = useState(SlotService.fetchSlots(moment().format(dateFormat).toString()));
    console.log(SlotService.fetchSlots({"date" : "2021-05-30"}));

    function onChangeDate(theDate, dateString) {
        date.current = dateString;
        setSlots(SlotService.fetchSlots("2021-05-30"))
        console.log(slots)
        console.log(date.current);
    }
    
    useEffect(() => {
        console.log('the age has changed', date)
    }, [date])

    return (
        <div style={{ background: "74828F", alignItems: "center" }}>
            <Navbar />
            <Row justify="center" direction="vertical">
                <Space
                    style={{ background: "74828F", alignItems: "center" }}
                    direction="vertical"
                    size={'large'}
                    align='center'
                >
                    <text className="booking">Make Bookings</text>
                    <Space>
                        <DatePicker
                            defaultValue={today}
                            //format={dateFormat}
                            onChange={onChangeDate}  
                        />
                    </Space>
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height: 50, fontSize: 25, border: "none", color: "#white" }}
                        onClick={() => {

                            //window.location.reload(false);
                        }}
                    >
                        Confirm Booking
                    </Button>
                </Space>
            </Row>
        </div>
    )
}

export default Bookings;