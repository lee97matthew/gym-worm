import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './DisplayBookings.css';

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