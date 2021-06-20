import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Button, Space, Row, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './Bookings.css'
import SlotService from "../services/slot.service";
import moment from 'moment';
import history from './../history';
import 'react-calendar-heatmap/dist/styles.css';
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import Display from "./DisplayBookings"

function Bookings() {
    const dateFormat = "YYYY-MM-DD";
    const date = useRef(moment().format(dateFormat).toString());
    const today = moment();
    //const [slots, setSlots] = useState(SlotService.fetchSlots(moment().format(dateFormat).toString()));
    const [slots, setSlots] = useState(SlotService.getCurrentSlots(JSON.stringify(today)) || []);
    alert(slots.length + " slots");
    console.log("slots are " + slots); 
    function onChangeDate(theDate, dateString) {
        date.current = JSON.parse(JSON.stringify(dateString));
        console.log("date is " + date.current.toString());

        const checkDate = {
            currentDate : date.current,
        }

        console.log("date is " + checkDate); 
        console.log("slots are " + slots.getSlots); 

        SlotService.fetchSlots(checkDate.currentDate).then(
            (res) => {
                console.log("finding slots for " + date.current);
                setSlots(SlotService.getCurrentSlots(checkDate.currentDate));
            },
            error => {
                console.log("cant find slot " + date.current + " " + error); 
                //history.push("/Bookings");
                //window.location.reload();
            }
        );
        console.log("after slots are " + slots); 
        
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
                    {
                        slots.length === 0 ? <Row/> : slots.capacity === 0 ? <Row/> : <Display slots={slots}/>  
                    }
                    <Space>
                        <DatePicker
                            defaultValue={today}
                            onChange={onChangeDate}
                        />
                    </Space>
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height: 50, fontSize: 25, border: "none", color: "#white" }}
                        onClick={() => {
                            SlotService.clearCurrentSlots(date); // halp
                            //window.location.reload(false);
                        }}
                    >
                        Confirm Booking
                    </Button>
                    <Input style={{ borderRadius: 35, width: 500 }}
                        placeholder={ "number of slots for this day is " + slots.length } 
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        suffix={
                            <Tooltip title="Last Name">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </Space>
            </Row>
        </div>
    )
}

export default Bookings;