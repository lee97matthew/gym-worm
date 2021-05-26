import React, { Component } from 'react';
import { Layout, Card } from 'antd';
import 'antd/dist/antd.css';
import './DisplayBookings.css';

const { Header, Footer, Sider, Content } = Layout;

class DisplayBookings extends Component {
    render() {
        return(
            <div>
                 <Card className='bookingStyle'>
                    <p className='text'>13 Feb 2021</p>
                </Card>
            </div>
        )
    }
}

export default DisplayBookings;