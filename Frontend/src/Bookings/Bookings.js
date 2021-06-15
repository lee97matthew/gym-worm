import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Breadcrumb, Button, Space, Col, Row, Card, Checkbox } from 'antd';
import history from "../history";
import 'antd/dist/antd.css';
import './Bookings.css'

function DisplayBookings() {
    const [isChecked, setChecked] = useState(false);

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
        setChecked(e.target.checked);
    }

    return(
        <div>
            
                <Card className='bookingStyle'>
                    <Row gutter={10}>
                    <Col span={15} style={{ padding: '8px 0' }} wrap="false">
                        <p className='text'>13 Feb 2021</p>
                    </Col>
                    <Col span={5}>
                        <Checkbox className="ant-checkbox" onChange={onChange}/>
                    </Col>
                    </Row>
                </Card>
            
        </div>
    )
}

function Bookings() {
    const [container, setContainer] = useState(null);

    return(
        <div style={{ background: "74828F", alignItems: "center" }}>
            <Navbar/>
            <Row justify="center" direction="vertical">
                <Space 
                    style={{ background: "74828F", alignItems: "center" }} 
                    direction="vertical" 
                    size={'large'} 
                    align='center'
                >
                    <text className="booking">Current Bookings</text>
                    <div className="scrollable-container" ref={setContainer} style={{ height:280 }}>
                    <Breadcrumb target={() => container}>
                        <Space 
                            style={{ background: "74828F", alignItems: "center" }} 
                            direction="vertical" size={'small'} 
                            align='center'
                        >
                            <DisplayBookings/>
                            <DisplayBookings/>
                            <DisplayBookings/> 
                            <DisplayBookings/>
                            <DisplayBookings/>
                        </Space>
                    </Breadcrumb>
                    </div>
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height:50, fontSize: 25,border: "none", color: "#ff7d7d" }}
                        onClick={() => {
                            
                            //window.location.reload(false);
                        }}
                    >
                        Cancel Bookings
                    </Button>
                    <hr style={{size:10, width:700, color:"white"}}/> 
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height:50, fontSize: 25, border: "none", color: "white" }}
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