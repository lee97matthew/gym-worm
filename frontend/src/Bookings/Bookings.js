import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Breadcrumb, Button, Space, Col, Row, Card, Checkbox } from 'antd';
import history from "../history";
import 'antd/dist/antd.css';
import './Bookings.css'
import AuthService from "../services/auth.service";
import SlotService from "../services/slot.service";
import axios from "axios";

const API_URL = "http://localhost:5000/api/slot/";

function Bookings() {
    history.push('/Bookings');

    const [container, setContainer] = useState(null);
    const [slots, setSlots] = useState([])
    const currentUser = AuthService.getCurrentUser()

    const arrSlots = []
    var cancelSlots = []

    if (currentUser) {
        AuthService.updateCurrentUser(currentUser.email, currentUser.password);
    }

    if (!window.location.hash.includes("#reloaded")) {
        window.location.href += "#reloaded";
        window.location.reload()
    }

    function DisplayBookings(props) {
        const isChecked = useRef([false, props.slot.date.slice(0, 10), props.slot.startTime]);

        const onChange = (e) => {
            isChecked.current = [e.target.checked, props.slot.date.slice(0, 10), props.slot.startTime];
            console.log(isChecked);
            if (isChecked.current[0]) {
                cancelSlots.push(props.slot);

            } else {
                if (cancelSlots.length !== 0) {
                    cancelSlots = cancelSlots.filter(element => element !== props.slot)
                }
            }
            console.log(cancelSlots);
        }

        const Time = (time) => {
            return time <= 12 ? `${time}am` : `${time - 12}pm`
        }

        return (
            <div>
                <Card className='bookingStyle'>
                    <Row gutter={10}>
                        <Col span={15} style={{ padding: '8px 0' }} wrap="false">
                            <p className='text'>{`Date: ${props.slot.date.slice(0, 10)} Time: ${Time(props.slot.startTime)}`}</p>
                        </Col>
                        <Col span={5}>
                            <Checkbox className="ant-checkbox" onChange={onChange} />
                        </Col>
                    </Row>
                </Card>

            </div>
        );
    }


    useEffect(() => {
        const temp = []
        currentUser.bookings.forEach(slot => {
            (async () => {
                const res = await axios.post(API_URL + 'retrieveSlot', { bookingID: slot });
                const posts = res.data.slot;
                temp.push([posts, slot])
                if (temp.length === currentUser.bookings.length) {
                    setSlots(temp)
                }
                console.log(temp)
            })()
        })

    }, [])

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
                    <text className="booking">Current Bookings</text>
                    <div className="scrollable-container" ref={setContainer} style={{ height: 280 }}>
                        <Breadcrumb target={() => container} id="slots" >
                            <Space
                                style={{ background: "74828F", alignItems: "center" }}
                                direction="vertical" size={'small'}
                                align='center'
                            >

                                {
                                    slots.length === 0 ? null : slots.forEach(element => arrSlots.push(<DisplayBookings slot={element[0]} />))
                                }
                                {
                                    slots.length === 0 ? null : arrSlots.map(elements => <div> {elements} </div>)
                                }

                            </Space>
                        </Breadcrumb>
                    </div>
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height: 50, fontSize: 25, border: "none", color: "#ff7d7d" }}
                        onClick={() => {
                            cancelSlots.forEach(s => {
                                var id;
                                slots.forEach(element => {
                                    if (s._id === element[0]._id) {
                                        id = element[1]
                                    }
                                })
                                AuthService.cancelBooking(currentUser.email, id)
                                SlotService.cancelledBooking(s._id, currentUser.id)
                            })
                            alert("Slot cancelled");
                            window.location.reload();
                        }}
                    >
                        Cancel Bookings
                    </Button>
                    <hr style={{ size: 10, width: 700, color: "white" }} />
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height: 50, fontSize: 25, border: "none", color: "white" }}
                        onClick={() => {
                            history.push('/MakeBookings');
                            window.location.reload(false);
                        }}
                    >
                        Make New Bookings
                    </Button>
                </Space>
            </Row>
        </div>
    )
}

export default Bookings;