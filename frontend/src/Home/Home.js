import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Col, Space, Card, Breadcrumb, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import DisplayBookings from './DisplayBookings/DisplayBookings'; // this needs to be here
import Credits from './Credits/Credits';
import AuthService from "../services/auth.service";
//import SlotService from "../services/slot.service";
import history from "../history";
import axios from "axios";

const { Header, Content } = Layout;
const API_URL = "https://gym-worm.herokuapp.com/api/slot/";
document.body.style = 'background: #74828F;';

function Home() {
    const arrSlots = [];
    const [container, setContainer] = useState(null);
    const [slots, setSlots] = useState([])
    
    const currentUser = AuthService.getCurrentUser()

    if (currentUser) {
        AuthService.updateCurrentUser(currentUser.email, currentUser.password);
    }     
   
    useEffect(() => {
        if (AuthService.getCurrentUser() === null) {
            history.push("/");
            window.location.reload(false);
        }
    }, [])

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
    
    function DisplayBookings(props) {
        const isChecked = useRef([false, props.slot.date.slice(0,10), props.slot.startTime]);

        const onChange = (e) => {
            isChecked.current = [e.target.checked, props.slot.date.slice(0,10), props.slot.startTime];
            console.log(isChecked);
            if (isChecked.current[0]) {
                arrSlots.push(props.slot)
            } else {
                if (arrSlots.length !== 0) {
                    arrSlots = arrSlots.filter(element => element !== props.slot)
                }
            }
            console.log(arrSlots)
        }
    
        const Time = (time) => {
            return time <= 12 ? `${time}am` : `${time - 12}pm`
        }
        
        return(
            <div>
                <Card className='card'>
                    <Row gutter={10}>
                    <Col style={{ padding: '8px 0' }} wrap="false">
                        <p className='text'>{`Date: ${props.slot.date.slice(0,10)} Time: ${Time(props.slot.startTime)}`}</p>
                    </Col>
                    </Row>
                </Card>
                    
            </div>
        );
    }

        return (
            <div>
                <Navbar />
                <Layout>
                <Header className='theTitle'>
                    <p1>Hi {currentUser.firstName + " " + currentUser.lastName}</p1>
                </Header>
                <Content style={{ background: "#74828F" }}>
                    <Layout className='layout'>
                        <Row>
                            <Col span={12}>
                                <Row align='center'>
                                    <Space direction="vertical" size={10} align='center'>
                                        <p1 className='textHome'>Your Bookings</p1>
                                        <Breadcrumb target={() => container} id="slots" >
                                            <Space 
                                                style={{ background: "74828F", alignItems: "center" }} 
                                                direction="vertical" size={'small'} 
                                                align='center'
                                            >
                                                { slots.length === 0 ? null : slots.forEach( element =>arrSlots.push(<DisplayBookings slot={element[0]}/>)) }
                                                { slots.length === 0 ? <p1 className='textHome'> No Bookings </p1> : arrSlots.map(elements => <div> {elements} </div> ) }
                                            </Space>
                                         </Breadcrumb>
                                    </Space>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row align='center'>
                                    <Space direction="vertical" size={10} align='center'>
                                        <p1 className='textHome'>Your Credit</p1>
                                        <Credits></Credits>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </Layout>
                </Content>
            </Layout>
            </div>
        )
}

export default Home;