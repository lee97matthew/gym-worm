import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import {  Button, Space, Row, DatePicker, TimePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import './Bookings.css'

const { Option } = Select;

function PickerWithType({ type, onChange }) {
    if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
}
  

function Bookings() {
    const [type, setType] = useState('time');

    return(
        <div style={{ background: "74828F", alignItems: "center" }}>
            <Navbar/>
            <Row justify="center"  direction="vertical">
                <Space 
                    style={{ background: "74828F", alignItems: "center" }} 
                    direction="vertical" 
                    size={'large'} 
                    align='center'
                >
                    <text className="booking">Make Bookings</text>
                    <Space>
                        <Select value={type} onChange={setType}>
                            <Option value="time">Time</Option>
                            <Option value="date">Date</Option>
                        </Select>
                        <PickerWithType type={type} onChange={value => console.log(value)} />
                    </Space>
                    <Button
                        type="primary"
                        shape="round"
                        style={{ background: "#525564", width: 500, height:50, fontSize: 25,border: "none", color: "#white" }}
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