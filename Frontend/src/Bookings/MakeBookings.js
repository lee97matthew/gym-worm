import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Button, Space, Row, DatePicker, Breadcrumb, Col, Card, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './Bookings.css'
import moment from 'moment';
import history from './../history';
import 'react-calendar-heatmap/dist/styles.css';
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import SlotService from "../services/slot.service";
import AuthService from "../services/auth.service";

function MakeBookings() {
    const currentUser = AuthService.getCurrentUser()

    const dateFormat = "YYYY-MM-DD";
    const date = useRef(moment().format(dateFormat).toString());
    const today = moment();
    const todayDate = JSON.stringify(new Date()).substring(1, 11);

    const [slotsAvail, setSlotAvail] = useState(false)
    const [container, setContainer] = useState(null);
    const [slots, setSlots] = useState([]);
    const arrSlots = []
    var bookedSlots =[]
    const len = slots.length;

    if (slots.length === 0) {
        SlotService.fetchSlots(todayDate).then(
            () => {
                console.log("finding slots for " + todayDate);
                setSlots(SlotService.getCurrentSlots(todayDate));
                setSlotAvail(true)

            },
            error => {
                console.log("cant find slot " + todayDate + " " + error);
                alert("No slots that day");
                setSlotAvail(false)
            }
        );
    }

    function onChangeDate(theDate, dateString) {
        date.current = JSON.parse(JSON.stringify(dateString));
        console.log("date is " + date.current.toString());

        const checkDate = {
            currentDate: date.current,
        }

        console.log("date is " + checkDate);
        console.log("slots are " + slots);

        SlotService.fetchSlots(checkDate.currentDate).then(
            () => {
                console.log("finding slots for " + date.current);
                setSlots(SlotService.getCurrentSlots(checkDate.currentDate));
                setSlotAvail(true)
            },
            error => {
                console.log("cant find slot for " + date.current + " " + error);
                alert("No slots that day");
                setSlotAvail(false)
            }
        );
    }

    function getLength() {      // these are for testing, can remove later
        if (slots.length !== 0) {
            return slots.length;
        }
        return 0;
    }

    function bookingsLen() {
        return bookedSlots.length > 2 ? true : false;
    }

    function DisplayBookings(props) {
        const isChecked = useRef([false, props.slot.date.slice(0,10), props.slot.startTime]);

        const onChange = (e) => {
            isChecked.current = [e.target.checked, props.slot.date.slice(0,10), props.slot.startTime];
            console.log(isChecked);
            if (isChecked.current[0]) {
                bookedSlots.push(props.slot)
            } else {
                if (bookedSlots.length !== 0) {
                    bookedSlots = bookedSlots.filter(element => element !== props.slot)
                }
            }
            console.log(bookedSlots)
        }
    
        const Time = (time) => {
            return time <= 12 ? `${time}am` : `${time - 12}pm`
        }
        
        return(
            <div>
                <Card className='bookingStyle'>
                    <Row gutter={10}>
                    <Col span={15} style={{ padding: '8px 0' }} wrap="false">
                        <p className='text'>{`Date: ${props.slot.date.slice(0,10)} Time: ${Time(props.slot.startTime)} Vacancy: ${props.slot.capacity}`}</p>
                    </Col>
                    <Col span={5}>
                        <Checkbox className="ant-checkbox" onChange={onChange}/>
                    </Col>
                    </Row>
                </Card>
                    
            </div>
        );
    }
    


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
                        slotsAvail ? slots.forEach(element => {arrSlots.push(<DisplayBookings slot={element}/>)}): <Row/> 
                        //<Display slots={element} user={currentUser}/>
                    }
                    <Space >
                        <DatePicker
                            defaultValue={today}
                            onChange={onChangeDate}
                        />
                    </Space>
                    <Breadcrumb target={() => container}>
                        <Space
                            style={{ background: "74828F", alignItems: "center" }}
                            direction="vertical"
                            size={'small'}
                            align='center'
                        >
                            { arrSlots.map(element => <div> {element} </div> ) }
                        </Space>   
                    </Breadcrumb>
                    <Button
                        type="primary"
                        shape="round"
                        disabled={bookingsLen()}
                        style={{ background: "#525564", width: 500, height: 50, fontSize: 25, border: "none", color: "#white" }}
                        onClick={() => {
                            bookedSlots.forEach(elements => {
                                SlotService.bookSlot(elements._id, currentUser.id, currentUser.email)
                                SlotService.recordBooking(elements._id, currentUser.id);
                                console.log("Booking Successful, See you there!");
                                console.log(elements);
                                console.log(elements.date.substring(0, 10));
                                SlotService.clearCurrentSlots(elements.date.substring(0, 10));
                            });
                            AuthService.updateCurrentUser(currentUser.email, currentUser.password);
                            history.push('/Bookings');
                            AuthService.updateCurrentUser(currentUser.email, currentUser.password);
                            window.location.reload(false);  
                        }}
                    >
                        Confirm Booking
                    </Button>

                    {/*hello u can ignore these below, im just testing the retrieving*/}

                    <Input style={{ borderRadius: 35, width: 500 }}
                        placeholder={"number of slots for this day is " + getLength()}
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

export default MakeBookings;